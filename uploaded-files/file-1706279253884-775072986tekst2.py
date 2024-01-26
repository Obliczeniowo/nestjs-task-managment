name = input("Podaj imię: ")
surname = input("Podaj nazwisko: ")
age = int(input("Podaj wiek: "))
weight = float(input("Podaj wagę [kg]: "))

print("Imię: %s\nNazwisko: %s\n%s\nWiek: %3d\nWaga [kg]: %5.1f"%(name, surname, "=" * 70, age, weight))