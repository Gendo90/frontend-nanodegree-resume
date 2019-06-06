# Memory Game Project

## Table of Contents

* [Introduction](#introduction)
* [Gameplay](#gameplay)
* [External Resources](#external resources)

## Introduction

This game was created as part of Udacity's Front-End Web Developer Nanodegree
to help learn JavaScript, and also HTML and CSS. The JavaScript code
manipulates the DOM containing HTML and CSS to transform the static webpage
provided by Udacity as part of their [Memory Game Project](https://github.com/udacity/fend-project-memory-game.git)
repo into an interactive memory game playable in any web browser.

## Gameplay

The gameplay for this app is relatively simple - the game starts when the
player clicks on a card to flip it over, and ends when all the card pairs have
been matched. There are eight (8) different icons on the cards, for a total of
16 cards.

The first card clicked of a potential pair remains visible until the second
card of the potential pair is clicked, and then both cards remain visible if
they are a match, and flip back over if they are not. Each potential pair that
is tried constitutes one (1) move for the game's move counter. The more moves
the player makes, the lower their star rating becomes, down to a minimum of
1-star.

When all cards have been matched successfully, the game will send the player
a congratulatory message showing their star rating and total game time. When
the player clicks the button to confirm they understand the message, the game
will reset so that all the cards have been shuffled and hidden, and a new game
will begin if the player clicks on any of the cards.

## External Resources
The core HTML and CSS code came from the original [Memory Game Project](https://github.com/udacity/fend-project-memory-game.git)
repo on Github, with some additions to colors, features like the timer, and
animations. The app.js file contains all my own work other than the shuffling
function that is credited to Stack Overflow.

The icons used for the cards and star rating are from [Font Awesome](https://fontawesome.com/?from=io)
and were included in the original project repo from Udacity.

The alert messages used to communicate with the player use [Sweet Alert 2](https://sweetalert2.github.io/)
to provide better, more customizable styling and responses than a standard
JS alert modal.
