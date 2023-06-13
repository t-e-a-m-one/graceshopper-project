# FETCH

Get ready to wag your tails because it's always a pawsitively delightful paw-ty here at Fetch! Our tails are wagging with excitement as we strive to sniff out the perfect fur-ever match between doggos and their paw-some humans. But wait, there's more! You, yes you, have the power to lend a helping paw and make a real difference. How, you ask? By becoming a proud sponsor of our delightful doggos! Join our pack today and embark on a journey filled with unconditional love and endless tail-wagging adventures. So why wait? Let's unleash the joy and make the world a barktastic place, one sponsorship at a time. It's time to grab life by the leash and lend a paw! Sponsor a dog today and experience the boundless love and tail-wagging fun that awaits you!

## Setup

To use this as boilerplate, you'll need to take the following steps:

- Don't fork or clone this repo! Instead, create a new, empty
  directory on your machine and `git init` (or create an empty repo on
  Github and clone it to your local machine)

- Now you will have to add the fs-app-template as a remote and merge it into your own repository.

```
git remote add boilermaker git@github.com:FullstackAcademy/fs-app-template-v2.git
git fetch boilermaker
git merge boilermaker/main
git branch -m master main
```

## Customize

Now that you've got the code, follow these steps to get acclimated:

- Update project name and description in `package.json`
- `npm install`
- Create two postgres databases (`MY_APP_NAME` should match the `name`
  parameter in `package.json`):
- These commands will create both your **development** and **test** databases

```
createdb <YOUR APP NAME HERE FROM package.json>
createdb <YOUR APP NAME HERE FROM package.json>-test
```

- By default, running `npm test` will use your test database, while
  regular development uses development database

## Start

Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)
