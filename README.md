# Hack Reactor Front End Capstone Project

## OVERVIEW
This is a project we did at Hack Reactor where we built a Product Description page for an e-commerce website.

## DESCRIPTION
Our app is a single page application built with React. It includes:

(1) Product Overview that displays a large image and important information about the product

(2) Questions & Answers that allows the user to view and submit questions and answers related to the product

(3) Ratings & Reviews that features a sortable list of customer-submitted reviews.

## INSTALLATION
(1) Clone the repo

(2) Setup .env file:

Make a copy of .sample-env

Add Port Number, GitHub Token, and ImgBB Token

(3) Run:
```javascript
npm install
npm run build // production bundle
npm run dev // development bundle
npm run server:dev // nodemon
```
## WIDGETS:

### PRODUCT OVERVIEW

![Product overview gif](https://lh3.googleusercontent.com/0vKCKmE0vzV7ksxTa9pcZpBi58nEvgTdCEeLaKu23PYqrzv-G4LswV6xAkmyMViQ0RlPMZ3osyHlb4nsoRF5UYIOFFdEZiQxI3WzLXPaDoZWFcGQOdA7kPmR-sq9ViD3kQeWrVXMB0LPi612XeDqLConj1aCAc0IS9V1RusWNeYAISThNsOA_OM2NF3chJYmEubUdgjtsjfEhq8myRPRduwWHmDvvvvuoCcn-_u3FZkxjbX70CZHrv_GurT_7-qAhq10nIAvcmgSbcDheb7o4oo8bfif25NZ77V0nHLfy6xgF-RdDMrSkl6MtMAEs2KgpxF9YPcfDqMZXEuMY8qHOCwTHkT9T7E-V3jh05mXVIG72ysuOz05Bq8chsjth7oKX9cRgUEkerNUVrqfb8dBXDogFPZKxST9PjKlUiV7uoqkFbkgy14VCq3gwfr94t-kNkiUjG8P61LVvggCXmeHr4pmUhQxAhXXqWMzPxjl-ZxFe39Ezt5l_dWfMqdAvOYu0CGYSSyE1HlH8oBeDGOgTfcRkAVlsilqxEHs6Z-ou8z_WtQzklj6rbhYxk4rc3DE7-9AJ4sGxGzaGbZRYnqZLrfMLc5QVyUAEv3m2jbCsGfIjZ2b6t1DS2kuddfJZ0CK2cgWFwRD9oCuzZZ7sePkx_YqXoCZRkuz25K5DuJLK2za6YiqnCl5mu5z0zdAv4cMhN8gQkQY-l2zcPXl4U14m8w=w1295-h710-no?authuser=0)

The product overview widget is the first thing a user sees when navigating to the page. It provides a large image and a lot of important product data.

The image can be cycled through all the available images for each product, and enlarged to a full-screen view. Once in full screen, the image can be clicked again to use a dynamic zooming effect. Moving the mouse in this mode also moves the zoom box around the image.

The details section, next to the image, contains the product category, name, and price. A series of five stars shows the average rating of the product. This section also allows the user to change the style using a set of thumbnails representing each style. Once a style is selected, the user can use a series of dropdowns to select the size (SKU) and then, finally, the quantity they would like to add to their cart. An add to cart button lies just below this with a 'favorite' button.

The product's extra section, below both the image end details section, displays a slogan, description, and some features the product has.

### QUESTIONS & ANSWERS
The Questions & Answers widget includes all user-submitted questions and answers related to the given product. The list of questions scrolls infinitely, and each question only displays two answers by default, with the option to display all answers upon clicking "Load More Answers." If there are more questions or answers than can be displayed on the page, the window is capped and the list becomes scrollable. Both questions and answers are sorted by the number of "Helpful" votes they have received - but all answers from the Seller will be listed first, with their username in bold.

Users can mark questions and answers helpful, and can also report them, which will remove them from the page. Users cannot mark something helpful more than once.
![](QADisplayReportHelpful.gif)

Additionally, users can submit their own answers, and upload up to five photos to be included with their answer. All photos in the widget, when clicked, expand to their full resolution.
![](QASubmitAnswer.gif)

Finally, users can submit their own questions, and can search through all questions and answers - matching text gets highlighted as the user inputs and deletes text. Both question and answer forms validate their required inputs, including email, and ensure that only images can be uploaded to the page.
![](QASubmitQSearch.gif)

### RATINGS & REVIEWS
\
The Ratings and Review Section features the average of all reviews along with a group of 5 stars, filled in based on the average reviews, rounded to the nearest quarter of a star. The section below is a breakdown of the star levels of reach review. Users can click each line, which acts as a filter to only see the desired reviews.

The product breakdown section consists of several characteristics and a slider indicating the average choice of each as submitted by users.

The heart of the Ratings and Reviews section is the product reviews themselves. Each review displays the rating shown by filled in stars, the user's review summary and content, a place for others to mark the review as helpful, and the ability to report a revew.

Below the review content, there is a button to load more reviews, and another to add a new review. This button opens a form with several fields to fill in and the ability to upload up to five product images
\
\
![](ratingsAndReviews.gif)

# Continuous Integration (IP)
Basic test of JavaScript continuous integration uses [CircleCI](https://circleci.com/) to run the tests, and [Coveralls](https://coveralls.io/) for reporting test coverage.

Circle CI: [![SDC-RPP29-sequoia/atelier-chevre](https://circleci.com/gh/SDC-RPP29-sequoia/atelier-chevre.svg?style=svg)](https://app.circleci.com/pipelines/github/SDC-RPP29-sequoia/atelier-chevre)

Coveralls: [![Coverage Status](https://coveralls.io/repos/github/SDC-RPP29-sequoia/atelier-chevre/badge.svg)](https://coveralls.io/github/SDC-RPP29-sequoia/atelier-chevre)

# SonarCloud (IP)
Additionally, [SonarCloud](https://sonarcloud.io/projects) is used for an overall check of code quality.

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=SDC-RPP29-sequoia_atelier-chevre&metric=alert_status)](https://sonarcloud.io/dashboard?id=SDC-RPP29-sequoia_atelier-chevre)

Quality: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=SDC-RPP29-sequoia_atelier-chevre&metric=alert_status)](https://sonarcloud.io/dashboard?id=SDC-RPP29-sequoia_atelier-chevre)

Maintainability: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=SDC-RPP29-sequoia_atelier-chevre&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=SDC-RPP29-sequoia_atelier-chevre)

Reliability: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=SDC-RPP29-sequoia_atelier-chevre&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=SDC-RPP29-sequoia_atelier-chevre)

Security: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=SDC-RPP29-sequoia_atelier-chevre&metric=security_rating)](https://sonarcloud.io/dashboard?id=SDC-RPP29-sequoia_atelier-chevre)

Lines of Code: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=SDC-RPP29-sequoia_atelier-chevre&metric=ncloc)](https://sonarcloud.io/dashboard?id=SDC-RPP29-sequoia_atelier-chevre)

Coverage: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=SDC-RPP29-sequoia_atelier-chevre&metric=coverage)](https://sonarcloud.io/dashboard?id=SDC-RPP29-sequoia_atelier-chevre)

Bugs: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=SDC-RPP29-sequoia_atelier-chevre&metric=bugs)](https://sonarcloud.io/dashboard?id=SDC-RPP29-sequoia_atelier-chevre)

Code Smells: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=SDC-RPP29-sequoia_atelier-chevre&metric=code_smells)](https://sonarcloud.io/dashboard?id=SDC-RPP29-sequoia_atelier-chevre)

Technical Debt: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=SDC-RPP29-sequoia_atelier-chevre&metric=sqale_index)](https://sonarcloud.io/dashboard?id=SDC-RPP29-sequoia_atelier-chevre)

