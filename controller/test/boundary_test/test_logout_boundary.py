import pytest
from test.sample_generation import _create_precondition_data, _delete_precondition_data
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

@pytest.mark.logout_boundary
def test_logout_boundary(driver, webdriverwait):
    _create_precondition_data()
    driver.get("http://localhost:5173/login")
    email_input = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, "email")))
    password_input = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, "password1")))
    submit_button = WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="root"]/div/div/div/form/button')))

    # login
    email_input.send_keys("bob@uow.edu.au")
    password_input.send_keys("bob12345")
    submit_button.click()

    profile_button = WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.XPATH, '/html/body/div/nav/div/button[2]')))
    profile_button.click()
    logout_button = WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.XPATH, '/html/body/div/nav/div/div[2]/ul/li/button')))
    logout_button.click()
    
    # Check if click no modal closed when click no
    no_button = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div/div/div/div/section/button[1]')))
    no_button.click()
    webdriverwait.until_not(EC.visibility_of_element_located((By.XPATH, "/html/body/div[2]/div/div/div/div")))

    # Check if get redirected to login and logged out when click yes
    profile_button = WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.XPATH, '/html/body/div/nav/div/button[2]')))
    profile_button.click()
    logout_button = WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.XPATH, '/html/body/div/nav/div/div[2]/ul/li/button')))
    logout_button.click()
    yes_button = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div/div/div/div/section/button[2]')))
    yes_button.click()
    webdriverwait.until(EC.url_to_be("http://localhost:5173/login"))
    
    _delete_precondition_data()