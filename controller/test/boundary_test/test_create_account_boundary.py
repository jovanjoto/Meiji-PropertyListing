import pytest
from .utils import valid_login_admin
from app import flask_app
from app.entity import User, db
from test.sample_generation import _create_precondition_data, _delete_precondition_data
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException

@pytest.mark.valid_create_account_boundary
def test_valid_create_account_boundary(driver, webdriverwait):
    _create_precondition_data()
    valid_login_admin(driver, webdriverwait)
    valid_data = [
        {"email": "bobby@uow.edu.au", "password" : "bob12345", "phone" : "54320000", "first_name" : "bob", "last_name" : "bee", "profile" : "Buyer"}
    ]
    for data in valid_data:
        retry_count = 0
        max_retries = 5
        while retry_count < max_retries:
            try:
                create_button = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div/div/div[1]/div[2]/button[2]')))
                create_button.click()
                first_name = webdriverwait.until(EC.element_to_be_clickable((By.ID, "first_name")))
                first_name.send_keys(data["first_name"])
                last_name = webdriverwait.until(EC.element_to_be_clickable((By.ID, "last_name")))
                last_name.send_keys(data["first_name"])
                email = webdriverwait.until(EC.element_to_be_clickable((By.ID, "email")))
                email.send_keys(data["email"])
                password = webdriverwait.until(EC.element_to_be_clickable((By.ID, "password")))
                password.send_keys(data["password"])
                phone = webdriverwait.until(EC.element_to_be_clickable((By.ID, "phone")))
                phone.send_keys(data["phone"])
                role = webdriverwait.until(EC.element_to_be_clickable((By.ID, data["profile"])))
                role.click()
                button = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/div[2]/div/div/div/div/div/form/div/section[7]/button[2]")))
                button.click()
                assert webdriverwait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div[3]/div/div/div/div/h1"))).text == "Success"
                with flask_app.app_context():
                    User.query.filter_by(email=data["email"]).delete()
                    db.session.commit()
                driver.refresh()
                break
            except StaleElementReferenceException:
                retry_count += 1
                if retry_count == max_retries:
                    assert False
                driver.refresh()
    _delete_precondition_data()

@pytest.mark.invalid_create_account_boundary
def test_invalid_create_account_boundary(driver, webdriverwait):
    _create_precondition_data()
    valid_login_admin(driver, webdriverwait)

    invalid_data = [
        {"email": "bob@@!", "password" : "bob12345", "phone" : "87434921", "first_name" : "bob", "last_name" : "bee", "profile" : "Buyer"},
        {"email": "bob@uow.edu.au", "password" : "bob12345", "phone" : "87434921", "first_name" : "bob", "last_name" : "the handyman", "profile" : "Buyer"},
        {"email": "tom@uow.edu.au", "password" : "tom09876", "phone" : "654321", "first_name" : "bob", "last_name" : "the handyman", "profile" : "Buyer"},
        {"email": "bobby@uow.edu.au", "password" : "bob12345", "phone" : "", "first_name" : "", "last_name" : "", "profile" : "Buyer"},
    ]
    
    for data in invalid_data:
        retry_count = 0
        max_retries = 5
        while retry_count < max_retries:
            try:
                create_button = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div/div/div[1]/div[2]/button[2]')))
                create_button.click()
                first_name = webdriverwait.until(EC.element_to_be_clickable((By.ID, "first_name")))
                first_name.send_keys(data["first_name"])
                last_name = webdriverwait.until(EC.element_to_be_clickable((By.ID, "last_name")))
                last_name.send_keys(data["first_name"])
                email = webdriverwait.until(EC.element_to_be_clickable((By.ID, "email")))
                email.send_keys(data["email"])
                password = webdriverwait.until(EC.element_to_be_clickable((By.ID, "password")))
                password.send_keys(data["password"])
                phone = webdriverwait.until(EC.element_to_be_clickable((By.ID, "phone")))
                phone.send_keys(data["phone"])
                role = webdriverwait.until(EC.element_to_be_clickable((By.ID, data["profile"])))
                role.click()
                button = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/div[2]/div/div/div/div/div/form/div/section[7]/button[2]")))
                button.click()

                assert (driver.execute_script('return document.querySelector("#email:invalid") !== null;') or \
                        driver.execute_script('return document.querySelector("#first_name:invalid") !== null;') or \
                        driver.execute_script('return document.querySelector("#last_name:invalid") !== null;') or \
                        driver.execute_script('return document.querySelector("#phone:invalid") !== null;') or \
                        webdriverwait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div[3]/div/div/div/div/h1"))).text == "Error") \
                == True
                driver.refresh()
                break
            except StaleElementReferenceException:
                retry_count += 1
                if retry_count == max_retries:
                    assert False
                driver.refresh()
    _delete_precondition_data()