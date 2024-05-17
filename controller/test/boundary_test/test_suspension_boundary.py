import pytest
from .utils import valid_login_admin
from controller.app import flask_app
from entity import Suspension,db
from controller.test.sample_generation import _create_precondition_data, _delete_precondition_data
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

@pytest.mark.invalid_suspend_account_boundary
def test_invalid_suspend_account_boundary(driver, webdriverwait):
    _create_precondition_data()
    valid_login_admin(driver, webdriverwait)

    suspend_button = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div[2]/div[1]/div/div/div[2]/button[2]")))
    suspend_button.click()

    reason = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/div[2]/div/div/div/div/div/div/div/section[1]/textarea")))
    reason.send_keys("1234")

    duration = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/div[2]/div/div/div/div/div/div/div/section[2]/div/input")))
    duration.send_keys("five")
    assert duration.text == ""
    _delete_precondition_data()

@pytest.mark.valid_suspend_account_boundary
def test_valid_suspend_account_boundary(driver, webdriverwait):
    _create_precondition_data()
    valid_login_admin(driver, webdriverwait)

    suspend_button = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div[2]/div[1]/div/div/div[2]/button[2]")))
    suspend_button.click()

    reason = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/div[2]/div/div/div/div/div/div/div/section[1]/textarea")))
    reason.send_keys("Breach of terms and condition")

    duration = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/div[2]/div/div/div/div/div/div/div/section[2]/div/input")))
    duration.send_keys(5)

    confirm_button = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/div[2]/div/div/div/div/div/div/div/section[3]/button[2]")))
    confirm_button.click()
    yes_button = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/div[3]/div/div/div/div/section/button[2]")))
    yes_button.click()
    card = webdriverwait.until(EC.presence_of_element_located((By.ID, "message-modal")))
    assert "successfully suspended" in card.text
    with flask_app.app_context():
        db.session.query(Suspension).delete()
        db.session.commit()
    _delete_precondition_data()

@pytest.mark.invalid_suspend_profile_boundary
def test_invalid_suspend_profile_boundary(driver, webdriverwait):
    _create_precondition_data()
    valid_login_admin(driver, webdriverwait)
    profile_tab = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div/nav/div/div/ul/li[2]/a')))
    profile_tab.click()

    suspend_btn = webdriverwait.until(EC.element_to_be_clickable((By.ID, 'suspend-Buyer')))
    suspend_btn.click()
    reason = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div/div/div/div/div/div/div/section[1]/textarea')))
    reason.send_keys("Updating System")
    duration = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div/div/div/div/div/div/div/section[2]/div/input')))
    duration.clear()
    duration.send_keys("four")
    assert duration.text == ""
    _delete_precondition_data()

@pytest.mark.valid_suspend_profile_boundary
def test_valid_suspend_profile_boundary(driver, webdriverwait):
    _create_precondition_data()
    valid_login_admin(driver, webdriverwait)
    profile_tab = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div/nav/div/div/ul/li[2]/a')))
    profile_tab.click()

    suspend_btn = webdriverwait.until(EC.element_to_be_clickable((By.ID, 'suspend-Buyer')))
    suspend_btn.click()
    reason = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div/div/div/div/div/div/div/section[1]/textarea')))
    reason.send_keys("Updating System")
    duration = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div/div/div/div/div/div/div/section[2]/div/input')))
    duration.clear()
    duration.send_keys(4)
    confirm = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div/div/div/div/div/div/div/section[3]/button[2]')))
    confirm.click()
    yes = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[3]/div/div/div/div/section/button[2]')))
    yes.click()
    msg = webdriverwait.until(EC.presence_of_element_located((By.ID, "message-modal")))
    assert "successfully suspended" in msg.text
    with flask_app.app_context():
        db.session.query(Suspension).delete()
        db.session.commit()
    _delete_precondition_data()