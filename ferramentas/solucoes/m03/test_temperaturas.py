from temperaturas import para_fahrenheit


def test_zero_graus_sao_32_fahrenheit():
    assert para_fahrenheit(0) == 32


def test_cem_graus_sao_212_fahrenheit():
    assert para_fahrenheit(100) == 212


def test_menos_quarenta_e_igual_nas_duas_escalas():
    assert para_fahrenheit(-40) == -40
