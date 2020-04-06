def write_registration_email(validation_code):
    return ("""Dear Capricorn Shark
Welcome to the joyful world of sharing your passion of food and restaurants. How nice that you found your way here!:)

Please validate your registration with the following validation code:
%s

Thank you very much,
Your Capricorn Shark team""" % validation_code)


def write_password_reset_email(validation_code):
    return ("""Dear Capricorn Shark

Please use the following validation code to reset your password:
%s

If you did not request a password change you can safely ignore this e-mail.

Thank you very much,
Your Capricorn Shark team""" % validation_code)
