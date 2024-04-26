import pytest
from .utils import valid_login_admin
from app import flask_app
from app.entity import UserProfile,db
from test.sample_generation import _create_precondition_data, _delete_precondition_data
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import time

@pytest.mark.invalid_create_profile_boundary
def test_invalid_create_profile_boundary(driver, webdriverwait):
    _create_precondition_data()
    valid_login_admin(driver, webdriverwait)
    profile_tab = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div/nav/div/div/ul/li[2]/a')))
    profile_tab.click()
    
    create_button = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div/div/div[1]/div[2]/button[2]')))
    create_button.click()
    
    profile = webdriverwait.until(EC.element_to_be_clickable((By.ID, 'profileName')))
    profile.send_keys("Buyer")
    buying_perm = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div/div/div/div/div/form/div/div/section[1]/div[2]/div/div/div[1]/input')))
    buying_perm.click()
    desc = webdriverwait.until(EC.element_to_be_clickable((By.ID, 'description')))
    desc.send_keys("any")

    confirm = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div/div/div/div/div/form/section/button[2]')))
    confirm.click()
    msg = webdriverwait.until(EC.presence_of_element_located((By.XPATH, '/html/body/div[3]/div/div/div/div/h1')))
    assert msg.text == "Error"
    _delete_precondition_data()
    

@pytest.mark.valid_create_profile_boundary
def test_valid_create_profile_boundary(driver, webdriverwait):
    _create_precondition_data()
    valid_login_admin(driver, webdriverwait)
    profile_tab = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div/nav/div/div/ul/li[2]/a')))
    profile_tab.click()

    create_button = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div/div/div[1]/div[2]/button[2]')))
    create_button.click()

    profile = webdriverwait.until(EC.element_to_be_clickable((By.ID, 'profileName')))
    profile.send_keys("second buyer")
    buying_perm = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div/div/div/div/div/form/div/div/section[1]/div[2]/div/div/div[1]/input')))
    buying_perm.click()
    desc = webdriverwait.until(EC.element_to_be_clickable((By.ID, 'description')))
    desc.send_keys("any")

    confirm = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div/div/div/div/div/form/section/button[2]')))
    confirm.click()
    msg = webdriverwait.until(EC.presence_of_element_located((By.XPATH, '/html/body/div[3]/div/div/div/div/h1')))
    assert msg.text == "Success"
    with flask_app.app_context():
        UserProfile.query.filter_by(name="second buyer").delete()
        db.session.commit()
    _delete_precondition_data()

@pytest.mark.view_profile_boundary
def test_view_profile_boundary(driver, webdriverwait):
    _create_precondition_data()
    valid_login_admin(driver, webdriverwait)
    profile_tab = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div/nav/div/div/ul/li[2]/a')))
    profile_tab.click()

    view_button = webdriverwait.until(EC.element_to_be_clickable((By.ID, 'view-Seller')))
    view_button.click()

    webdriverwait.until(EC.presence_of_element_located((By.XPATH, '/html/body/div[2]/div/div/div/div/div')))
    _delete_precondition_data()

@pytest.mark.update_profile_boundary
def test_update_profile_boundary(driver, webdriverwait):
    _create_precondition_data()
    valid_login_admin(driver, webdriverwait)
    profile_tab = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div/nav/div/div/ul/li[2]/a')))
    profile_tab.click()

    view_button = webdriverwait.until(EC.element_to_be_clickable((By.ID, 'view-Buyer')))
    view_button.click()

    # Check for cancel
    edit_button = webdriverwait.until(EC.element_to_be_clickable((By.ID, 'edit-profile')))
    edit_button.click()
    cancel = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div/div/div/div/div/div/div/section[3]/button[1]')))
    cancel.click()

    # Check for valid update
    edit_button = webdriverwait.until(EC.element_to_be_clickable((By.ID, 'edit-profile')))
    edit_button.click()
    buying = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div/div/div/div/div/div/div/section[2]/div/div/div[1]/input')))
    buying.click()
    listing = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div/div/div/div/div/div/div/section[2]/div/div/div[2]/input')))
    listing.click()

    confirm = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div/div/div/div/div/div/div/section[3]/button[2]')))
    confirm.click()
    msg = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[3]/div/div/div/div/h1')))
    assert "successfully updated" in msg.text
    _delete_precondition_data()

@pytest.mark.invalid_profile_search_boundary
def test_invalid_profile_search_boundary(driver, webdriverwait):
    _create_precondition_data()
    valid_login_admin(driver, webdriverwait)
    profile_tab = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div/nav/div/div/ul/li[2]/a')))
    profile_tab.click()

    search = webdriverwait.until(EC.element_to_be_clickable((By.ID, 'Search')))
    search.send_keys("super user")
    msg = webdriverwait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div/div/div[2]/span")))
    assert "No matching" in msg.text
    _delete_precondition_data()

@pytest.mark.valid_profile_search_boundary
def test_valid_profile_search_boundary(driver, webdriverwait):
    _create_precondition_data()
    valid_login_admin(driver, webdriverwait)
    profile_tab = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div/nav/div/div/ul/li[2]/a')))
    profile_tab.click()

    search = webdriverwait.until(EC.element_to_be_clickable((By.ID, 'Search')))
    search.send_keys("Seller")
    cards = webdriverwait.until(EC.presence_of_all_elements_located((By.ID, "profile-name")))
    for card in cards:
        if "Seller" not in card.text:
            assert False
    
    # Filter test
    search = webdriverwait.until(EC.element_to_be_clickable((By.ID, 'Search')))
    search.clear()
    search.send_keys("w")
    search.send_keys(Keys.BACK_SPACE)
    filter = webdriverwait.until(EC.element_to_be_clickable((By.ID, ':r9:')))
    filter.click()
    listing_filter = webdriverwait.until(EC.element_to_be_clickable((By.ID, 'listing')))
    listing_filter.click()
    cards = webdriverwait.until(EC.presence_of_all_elements_located((By.ID, "permission")))
    for card in cards:
        if "Listing" not in card.text:
            assert False
    _delete_precondition_data()