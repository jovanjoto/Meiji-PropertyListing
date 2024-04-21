from Profile import profile_bp

@profile_bp.route('/profile')
def profile_home():
  return {
    "message": "Profile Home"
  }