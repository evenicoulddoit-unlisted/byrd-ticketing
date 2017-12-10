# Byrd Ticketing System
[**Byrd Full-Stack Submission**](https://gist.github.com/sebastianmach/1ef990be29d24dc55babe56d0f2f1a9a)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Summary
* Use the Heroku one-click deploy button to create the app
  * You'll need to create a user using the Django admin.
    You can call `heroku run ticketing/manage.py shell_plus` once the app has
    deployed to do this.
* Technologies used:
  * Python**3**, Django, Django Rest Framework, PostgreSQL, Angular 5, Vanilla CSS
  * I chose Django and Angular because I have a good knowledge of both, and
    because they closely match the Byrd stack
  * I opted for Python 3 and vanilla CSS because these exercises are a good
    opportunity to try out new things
* The front-end work was more intricate, and so it took me more time, but is
  still missing some features due to time constraints:
  * No tests
  * [No "route guarding"](https://angular.io/guide/router#milestone-5-route-guards)
  * No ability to add ticket comments
* The back-end has a number of integration tests for the views. Given the time
  constraints it seemed like the most appropriate thing to focus on testing was
  the API layer (including authentication)

## Project layout
* This single repo contains both a Django *and* an Angular project
  * The Django project directory is `ticketing`
  * The Angular project root is `ng`

## Coding standards
* Python - Pep8/257 conformance
* Typescript - TSLint
* CSS - BEM

## Running locally
* Pip install the Python**3**, requirements
  * `pip install -r requirements.txt`
* Set the node version, and install the node requirements
  * `nvm use && npm install`
* Run the Django development server
  * `python ticketing/manage.py runserver --settings=ticketing.settings.dev`
* Run the Angular development server
  * `npm install -g @angular/cli`
  * `cd ng; ng serve --port 8001`
  * Running `npm run-script build` will create a production-ready version of
    the front-end. These are then symlinked into the Django project and
    collected as static using the `manage.py collectstatic` command

## Additional notes
### Backend
* Used Django `start[project/app]` to bootstrap
* Tickets can be submitted anonymously, but some mechanism could be made to
  prevent spam (e.g. reCAPTCHA, throttling, IP tracking)
* Modelling would be clearly be improved by some way of tracking changes,
  e.g. using something like [Django Simple History](https://github.com/treyhunner/django-simple-history)
* Might be nicer to authenticate using OAuth
* API views are very basic. Having the serializer output all fields is prone
  to accidentally leaking information if fields were added in the future.
* Views and serializers were created using TDD. More edge-case tests would be
  useful (e.g. DELETE deletes the *expected* ticket)

### Frontend
* Used Angular CLI to bootstrap
* I turned off "output hashing" (hash of file appended to filename) within
  Angular, as Django whitenoise will do this itself, and Django will still
  know how to find the hashed file
* Ran out of time to write tests. Back-end tests at least cover most important
  base - security
* Ran out of time to handle errors more effectively
