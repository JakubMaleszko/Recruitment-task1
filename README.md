## Zadania

## Wymagania

Prosimy użyć:

- `node` (najlepiej LTS obecnej wersji)
- `yarn`
- `jest`

### Obowiązkowym wymogiem jest opublikowanie aplikacji w jednej z popularnych usług hostingowych np. Heroku, AWS itp.

### Seedowanie bazy danych

Seedy znajdują się w`data/users.json`. Format jest ściśle powiązany z mongodb, ale możesz go dowolnie dostosować i użyć w wybranej bazie danych.

### Plik z logami

Przykładowy plik z logami znajduje się w`data/events.log`

## Zadanie

### Część 1

Twoim zadaniem jest stworzenie mikroserwisowej aplikacji, która pozwoli autoryzowanym żądaniom odczytać logi przetwarzane przez serwer aplikacji.

Dodatkowe informacje:
* Poświadczenia znajdują się w pliku users.json w folderze danych w tym repozytorium
* Na potrzeby aplikacji wykorzystujemy wygenerowany plik events.log z przykładami znajdujący się w folderze danych w tym repozytorium. Struktura logów wygląda następująco:

Przykładowy wpis:

| timestamp | UUIDv4 | type | message |
|---|---|---|---|
| 1584969745903 | eab576a7-ea7f-4ce1-acfb-4e97d3a4a5bb | warn | AccessDenied: You are not authorize |

Wykonaj następujące żądania:

1. Możliwość pobrania całej listy logów lub określonego zakresu od / do na podstawie sygnatury czasowej
```
Request:
  Header:
  authorization-token: String (UUIDv4)
  GET /public/logs?from=...&to=...
Response:
  [
    {
      uuid:    String (UUIDv4)
      time:    String (format ISO)
      type:    String (info|warn|error)
      message: String
    }
  ]
  Status: 200
```
2. Możliwość wyszukania konkretnego wpisu z podanym UUID
```

Request:
  Header:
  authorization-token: String (UUIDv4)
  GET /public/logs/:uuid
Response:
  {
    time:    String (format ISO)
    type:    String (info|warn|error)
    message: String
  }
  Status: 200
```
3. Możliwość tworzenia przez administratora nowego użytkownika (nie będącego administratorem) z listą uprawnień (tylko uprawnienia do odczytu i tworzenia powinny być możliwe)
```
Request:
  Header:
  authorization-token: String (UUIDv4)
  POST /internal/users
  Body:
  {
    username:    String
    permissions: [String] (read|create)
  }
Response:
  {
    username:    String
    token:       String   (UUIDv4)
    permissions: [String] (read|create)
  }
  Status: 201
```

Oceniane będzie, czy:
* Twoje rozwiązanie realizuje założenia zadania
* Twój kod jest spójny lub używa lintera
* aplikacja jest objęta zakresem do tego stopnia, że możemy założyć, że wiesz, jak pisać specyfikacje
* unikasz kodu proceduralnego
* wnioski są prawidłowo obsługiwane
* Struktura git jest spójna
* struktura projektu jest dobrze przemyślana
* wyjątki są prawidłowo obsługiwane
* dane wejściowe są zatwierdzone

Możesz również zdobyć dodatkowe punkty, jeśli Twoje rozwiązanie będzie w jakiś sposób niezwykłe i będzie wykorzystywać najlepsze praktyki

### Część 2

Kierownictwo zdecydowało się na dokeryzację aplikacji. Twoim zadaniem jest przygotowanie aplikacji z zadania nr 1 tak, aby działała w środowisku deweloperskim w kontenerze Docker.

Chcemy mieć możliwość zmiany parametrów połączenia z bazą danych w zależności od środowiska (rozwój / test)

Rezultatem powinien być skrypt, który pozwoli:
* uruchomić działający serwer aplikacji w kontenerze
* uruchomić testy aplikacji w kontenerze

na przykład przy pomocy docker-compose

Oceniane będzie, czy:
* Twoje rozwiązanie realizuje założenia zadania
* Moduły npm są poprawnie buforowane podczas budowania obrazu Dockera
* zmienne środowiskowe są przekazywane poprawnie

Możesz również zdobyć dodatkowe punkty, jeśli Twoje rozwiązanie będzie w jakiś sposób niezwykłe i będzie wykorzystywać najlepsze praktyki