# Location Ranker

Thanks for checking this out! The idea is to, while looking for a new apartment or house or place to live/visit, scoring how good that place is based on what you want it to be near.

## Steps to run locally

Eventually it would be fun to host this. For now, just clone and run locally.

### Client

1. rename '.example.env.local' to '.env.local'. Replace "YOUR_API_KEY" with your Google API key.

2. Separately, get an API key for Google Maps.

- If you don't have one, check this page for how to set up an account and get a key.
- You'll need to make sure the key is enabled for the following APIs:
  - Directions API
  - Geocoding API
  - Maps JavaScript API
  - Places API

2. install packages:

   ```bash
   npm run install
   ```

3. start development environment: `npm run dev`

### Server

1. within './server', rename '.example.env' to '.env' and replace the preset values:

- SECRET_KEY: generate a django project key by running these two commands in your terminal:

```bash
  python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

- Insert Google API Key, same from Client.
- USE_FAKE_API_DATA: If set to TRUE, code will reference hardcoded dummy data. When developing, this will limit API calls, and thus costs associated with Google's API.

2. At './server', create a shell environment. I used pipenv when developing, but pip or other options should work.

```bash
# if you don't have pipenv, run install
pip install pipenv
pipenv shell
```

3. Run DB migrations:

```bash
python manage.py migrate
```

3. Run server:

```bash
python manage.py runserver
```

### See the application:

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
