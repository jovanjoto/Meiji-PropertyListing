def pytest_configure(config):
    config.addinivalue_line(
        "markers", "valid_login_test: mark test as valid login test"
    )
    config.addinivalue_line(
        "markers", "invalid_login_test: mark test as invalid login test"
    )
    config.addinivalue_line(
        "markers", "test_valid_create_account: mark test as valid account creation test"
    )
    config.addinivalue_line(
        "markers", "test_invalid_create_account: mark test as invalid account creation test"
    )
    config.addinivalue_line(
        "markers", "test_valid_view_account: mark test as valid account view test"
    )
    config.addinivalue_line(
        "markers", "test_invalid_view_account: mark test as invalid account view test"
    )
    config.addinivalue_line(
        "markers", "test_valid_update_account: mark test as valid account update test"
    )
    config.addinivalue_line(
        "markers", "test_invalid_update_account: mark test as invalid account update test"
    )
    config.addinivalue_line(
        "markers", "test_search_user_account: mark test as user account search test"
    )
    config.addinivalue_line(
        "markers", "test_valid_create_profile: mark test as valid create profile test"
    )
    config.addinivalue_line(
        "markers", "test_invalid_create_profile: mark test as invalid create profile test"
    )
    config.addinivalue_line(
        "markers", "test_valid_view_profile: mark test as valid view profile test"
    )
    config.addinivalue_line(
        "markers", "test_invalid_view_profile: mark test as invalid view profile test"
    )
    config.addinivalue_line(
        "markers", "test_valid_update_profile: mark test as valid update profile test"
    )
    config.addinivalue_line(
        "markers", "test_invalid_update_profile: mark test as invalid update profile test"
    )
    config.addinivalue_line(
        "markers", "test_search_user_profile: mark test as search user profile test"
    )
    config.addinivalue_line(
        "markers", "test_valid_suspend_account: mark test as valid suspend account test"
    )
    config.addinivalue_line(
        "markers", "test_invalid_suspend_account: mark test as invalid suspend account test"
    )
    config.addinivalue_line(
        "markers", "test_valid_suspend_profile: mark test as valid suspend profile test"
    )
    config.addinivalue_line(
        "markers", "test_invalid_suspend_profile: mark test as invalid suspend profile test"
    )
    