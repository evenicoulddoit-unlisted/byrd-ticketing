# Notes on solution
## Backend
* Used Django start[project/app] to bootstrap
* Tickets can be submitted anonymously, but some mechanism could be made to
  prevent spam (e.g. reCAPTCHA, throttling, IP tracking)
* Modelling would be clearly be improved by some way of tracking changes,
  e.g. using something like [Django Simple History](https://github.com/treyhunner/django-simple-history)
* Might be nicer to authenticate using OAuth
* API views are very basic. Having the serializer output all fields is prone
  to accidentally leaking information if fields were added in the future.
* Views and serializers were created using TDD. More edge-case tests would be
  useful (e.g. DELETE deletes the *expected* ticket)

## Frontend
* Used Angular CLI to bootstrap
* Created within the same repo, though it would probably be nicer to separate
* Use `npm install` to compile all the assets. These are then symlinked into
  Django's static
  * I turned off "output hashing" (hash of file appended to file) within
    Angular, as Django whitenoise will do this itself, and Django will still
    know how to find the hashed file
