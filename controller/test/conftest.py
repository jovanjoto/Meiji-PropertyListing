def pytest_configure(config):
    config.addinivalue_line(
        "markers", "valid_login_test: mark test as valid login test"
    )
    config.addinivalue_line(
        "markers", "invalid_login_test: mark test as invalid login test"
    )
    config.addinivalue_line(
        "markers", "valid_create_account: mark test as valid account creation test"
    )
    config.addinivalue_line(
        "markers", "invalid_create_account: mark test as invalid account creation test"
    )
    config.addinivalue_line(
        "markers", "valid_view_account: mark test as valid account view test"
    )
    config.addinivalue_line(
        "markers", "invalid_view_account: mark test as invalid account view test"
    )
    config.addinivalue_line(
        "markers", "valid_update_account: mark test as valid account update test"
    )
    config.addinivalue_line(
        "markers", "invalid_update_account: mark test as invalid account update test"
    )
    config.addinivalue_line(
        "markers", "search_user_account: mark test as user account search test"
    )