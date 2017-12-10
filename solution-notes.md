# Notes on solution
## Backend
* Tickets can be submitted anonymously, but some mechanism could be made to
  prevent spam (e.g. reCAPTCHA, throttling, IP tracking)
* Modelling would be clearly be improved by some way of tracking changes,
  e.g. using something like [Django Simple History](https://github.com/treyhunner/django-simple-history)
* Might be nicer to authenticate using OAuth
