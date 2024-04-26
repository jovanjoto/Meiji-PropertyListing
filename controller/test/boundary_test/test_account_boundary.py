import pytest
from .utils import valid_login_admin
from app import flask_app
from app.entity import User,db
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

@pytest.mark.view_account_boundary
def test_view_account_boundary(driver, webdriverwait):
    _create_precondition_data()
    valid_login_admin(driver, webdriverwait)

    # Wait for the element to appear
    webdriverwait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div/div/div[2]/div[1]/div")))

    for i in range(1, 101):
        card = webdriverwait.until(EC.presence_of_element_located((By.XPATH, f"/html/body/div/div/div[2]/div[{i}]/div")))
        if "bob@uow.edu.au" in card.text:
            view_button = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, f"/html/body/div/div/div[2]/div[{i}]/div/div/div[2]/button[1]")))
            view_button.click()

            # Check if user modal pops up
            webdriverwait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div[2]/div/div/div/div/div")))
            break
    _delete_precondition_data()

@pytest.mark.invalid_update_account_boundary
def test_invalid_update_account_boundary(driver, webdriverwait):
    _create_precondition_data()
    valid_login_admin(driver, webdriverwait)
    
    view_button = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, f"/html/body/div/div/div[2]/div[1]/div/div/div[2]/button[1]")))
    view_button.click()
    # Check if enter non unique phone number valid
    edit_button = webdriverwait.until(EC.element_to_be_clickable((By.ID, 'edit-pencil')))
    edit_button.click()
    phone = webdriverwait.until(EC.element_to_be_clickable((By.ID, "phone")))
    phone.clear()
    phone.send_keys("87434921")
    submit = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/div[2]/div/div/div/div/div/div/form/section[4]/button[2]")))
    submit.click()
    modal = webdriverwait.until(EC.presence_of_element_located((By.XPATH, '/html/body/div[3]/div/div/div/div')))
    assert "Failed" in modal.text
    _delete_precondition_data()

@pytest.mark.valid_update_account_boundary
def test_valid_update_account_boundary(driver, webdriverwait):
    _create_precondition_data()
    valid_login_admin(driver, webdriverwait)

    view_button = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, f"/html/body/div/div/div[2]/div[1]/div/div/div[2]/button[1]")))
    view_button.click()

    # Check if cancel is working
    edit_button = webdriverwait.until(EC.element_to_be_clickable((By.ID, 'edit-pencil')))
    edit_button.click()
    cancel_button = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div/div/div/div/div/div/form/section[4]/button[1]')))
    cancel_button.click()
    edit_button = webdriverwait.until(EC.element_to_be_clickable((By.ID, 'edit-pencil')))
    edit_button.click()

    # Check for valid change
    phone = webdriverwait.until(EC.element_to_be_clickable((By.ID, "phone")))
    phone.clear()
    phone.send_keys("87434922")
    name = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div/div/div/div/div/div/input')))
    name.clear()
    name.send_keys("Chicken")
    submit = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/div[2]/div/div/div/div/div/div/form/section[4]/button[2]")))
    submit.click()
    modal = webdriverwait.until(EC.presence_of_element_located((By.XPATH, '/html/body/div[3]/div/div/div/div')))
    assert "success" in modal.text
    _delete_precondition_data()

@pytest.mark.valid_search_account_boundary
def test_valid_search_account_boundary(driver, webdriverwait):
    _create_precondition_data()
    valid_login_admin(driver, webdriverwait)
    # Search for peter
    search = webdriverwait.until(EC.element_to_be_clickable((By.ID, "Search")))
    search.send_keys("Peter")
    cards = webdriverwait.until(EC.presence_of_all_elements_located((By.ID, "username")))
    for card in cards:
        if "peter" not in card.text.lower():
            assert False

    # Add filter
    filter = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div[1]/div[2]/button[1]")))
    filter.click()
    agent_filter = webdriverwait.until(EC.element_to_be_clickable((By.ID, "Real Estate Agent")))
    agent_filter.click()
    seller_filter = webdriverwait.until(EC.element_to_be_clickable((By.ID, "Seller")))
    seller_filter.click()
    cards = webdriverwait.until(EC.presence_of_all_elements_located((By.ID, "profile-name")))
    for card in cards:
        if "Buyer" not in card.text:
            assert False
    _delete_precondition_data()

@pytest.mark.invalid_search_account_boundary
def test_invalid_search_account_boundary(driver, webdriverwait):
    _create_precondition_data()
    valid_login_admin(driver, webdriverwait)
    # Search for invalid name
    search = webdriverwait.until(EC.element_to_be_clickable((By.ID, "Search")))
    search.send_keys("bob@@1!")
    msg = webdriverwait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div/div/div[2]/span")))
    assert "No matching" in msg.text
    _delete_precondition_data()
    

    