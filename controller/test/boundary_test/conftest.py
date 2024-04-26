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
    config.addinivalue_line(
        "markers", "view_account_boundary: mark test as valid view"
    )
    config.addinivalue_line(
        "markers", "invalid_create_account_boundary: mark test as ivalid create account"
    )
    config.addinivalue_line(
        "markers", "valid_create_account_boundary: mark test as valid create account"
    )
    config.addinivalue_line(
        "markers", "invalid_update_account_boundary: mark test as invalid update account"
    )
    config.addinivalue_line(
        "markers", "valid_update_account_boundary: mark test as valid update account"
    )
    config.addinivalue_line(
        "markers", "valid_search_account_boundary: mark test as valid search account"
    )
    config.addinivalue_line(
        "markers", "invalid_search_account_boundary: mark test as invalid search account"
    )
    config.addinivalue_line(
        "markers", "invalid_suspend_account_boundary: mark test as invalid suspend account"
    )
    config.addinivalue_line(
        "markers", "valid_suspend_account_boundary: mark test as valid suspend account"
    )