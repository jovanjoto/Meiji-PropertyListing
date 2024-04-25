import pytest
from test.sample_generation import _create_precondition_data, _delete_precondition_data
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@pytest.mark.invalid_login_boundary
def test_invalid_login_boundary(driver, webdriverwait):
    _create_precondition_data()
    driver.get("http://localhost:5173/login")

    email_input = webdriverwait.until(EC.presence_of_element_located((By.ID, "email")))
    password_input = webdriverwait.until(EC.presence_of_element_located((By.ID, "password1")))
    submit_button = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="root"]/div/div/div/form/button')))

    # Check if invalid email tooltip appears
    email_input.send_keys("bob@@!")
    password_input.send_keys("bob12345")
    submit_button.click()
    assert driver.execute_script('return document.querySelector("#email:invalid") !== null;') == True

    # Check when email doesnt match any in the database
    data = [{"email" : "bobetta@mail.com", "password":"bobetta12345"}, {"email" : "bob@uow.edu.au", "password":"bobetta12345"}]
    for d in data:
        email_input.clear()
        password_input.clear()

        email_input.send_keys(d["email"])
        password_input.send_keys(d["password"])
        submit_button.click()
        WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.XPATH, '/html/body/div/div/div/div/form/div[2]/p/span')))

    _delete_precondition_data()

@pytest.mark.valid_login_boundary
def test_valid_login_boundary(driver, webdriverwait):
    _create_precondition_data()
    driver.get("http://localhost:5173/login")
    email_input = webdriverwait.until(EC.presence_of_element_located((By.ID, "email")))
    password_input = webdriverwait.until(EC.presence_of_element_located((By.ID, "password1")))
    submit_button = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="root"]/div/div/div/form/button')))

    # Check if invalid email tooltip appears
    email_input.send_keys("bob@uow.edu.au")
    password_input.send_keys("bob12345")
    submit_button.click()

    # Check if redirected
    webdriverwait.until(EC.url_to_be("http://localhost:5173/"))

    _delete_precondition_data()