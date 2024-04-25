import pytest
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait

@pytest.fixture()
def driver():
   
    driver = webdriver.Chrome()
    yield driver
 
    driver.quit()

@pytest.fixture()
def webdriverwait(driver):
    webdriverwait = WebDriverWait(driver, 5)
    yield webdriverwait

def pytest_configure(config):
    config.addinivalue_line(
        "markers", "invalid_login_boundary: mark test as invalid login test"
    )
    config.addinivalue_line(
        "markers", "valid_login_boundary: mark test as valid login test"
    )
    config.addinivalue_line(
        "markers", "logout_boundary: mark test as valid logout test"
    )
