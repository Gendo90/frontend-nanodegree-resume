import random
# IPND Stage 2 Final Project

# You've built a Mad-Libs game with some help from Sean.
# Now you'll work on your own game to practice your skills and demonstrate what you've learned.

# For this project, you'll be building a Fill-in-the-Blanks quiz.
# Your quiz will prompt a user with a paragraph containing several blanks.
# The user should then be asked to fill in each blank appropriately to complete the paragraph.
# This can be used as a study tool to help you remember important vocabulary!

# Note: Your game will have to accept user input so, like the Mad Libs generator,
# you won't be able to run it using Sublime's `Build` feature.
# Instead you'll need to run the program in Terminal or IDLE.
# Refer to Work Session 5 if you need a refresher on how to do this.

# To help you get started, we've provided a sample paragraph that you can use when testing your code.
# Your game should consist of 3 or more levels, so you should add your own paragraphs as well!

paragraph1 = """A ___1___ is created with the def keyword. You specify the inputs a ___1___ takes by
adding ___2___ separated by commas between the parentheses. ___1___s by default return ___3___ if you
don't specify the value to return. ___2___ can be standard data types such as string, number, dictionary,
tuple, and ___4___ or can be more complicated such as objects and lambda functions."""

# The answer for ___1___ is 'function'. Can you figure out the others?

# We've also given you a file called fill-in-the-blanks.pyc which is a working version of the project.
# A .pyc file is a Python file that has been translated into "byte code".
# This means the code will run the same as the original .py file, but when you open it
# it won't look like Python code! But you can run it just like a regular Python file
# to see how your code should behave.

# Hint: It might help to think about how this project relates to the Mad Libs generator you built with Sean.
# In the Mad Libs generator, you take a paragraph and replace all instances of NOUN and VERB.
# How can you adapt that design to work with numbered blanks?

paragraph2 = """I wrote this code using the ___1___ text editor, which is available for free online.
I chose this text editor over the ___2___ text editor because ___2___ is not free to use. My ___1___
text editor has a lot of ___3___s over a standard IDE or computer ___4___, but it also comes with
some major drawbacks, too. For example, some features that come standard with the ___5___ IDE need to be
installed separately as ___6___s for ___1___ or ___2___. This ___7___ would not run on ___1___
with its vanilla ___8___ because that ___8___ did not initially run ___5___ or support user-entered input. """



paragraph3 = """The ___1___ has made ___2___ more useful as computers are becoming ___3___. I feel
___4___ to be able to take ___2___ classes on the ___1___. This sort of ___5___ transfer and ___6___
acquisition would have happened at a much more ___7___ rate in the ___8___, with fewer users on the
___1___ and the ___5___ available being more ___7___. It is ___4___, too, that ___9___s are also
___3___ and can access the ___5___ on the ___1___ anywhere, regardless of ___10___ ___6___.
___2___ ___6___s are still useful, however, as the ___5___ age continues!"""



# A list of replacement words to be passed in to the play game function.
blank_list1  = {"___1___" : "function",
                "___2___" : "variables",
                "___3___" : "None",
                "___4___" : "list"}


blank_list2 = {"___1___" : "Atom",
               "___2___" : "Sublime",
               "___3___" : "advantage",
               "___4___" : "terminal",
               "___5___" : "Python",
               "___6___" : "package",
               "___7___" : "program",
               "___8___" : "install"}



blank_list3 = {"___1___" : "Internet",
               "___2___" : "Computer Science",
               "___3___" : "ubiquitous",
               "___4___" : "fortunate",
               "___5___" : "information",
               "___6___" : "skill",
               "___7___" : "limited",
               "___8___" : "past",
               "___9___" : "smartphone",
               "___10___" : "user"}


# levels that are possible selections!
level_selections = ["easy", "medium", "hard"]



# checks if the word variable given to the function corresponds to an
# entry in the dictionary keys e.g. "___1___" or "___2___"
# inputs are a "word" variable that is a string, and a "blank_list" variable
# that is a dictionary.
# The output is True if the word can be found as a dictionary key in the
# "blank_list" dictionary, and False if it is not a key
def word_is_blank(word, blank_list):
    for blank in blank_list:
        if blank in word:
            return True
    return False


# Checks if a word passed in is the correct answer for a certain blank.
# The blank must correspond to right key in blank_list dictionary
# If the input word is correct for that blank, returns True
# If the input word is incorrect for that blank, returns False
def correct_word_in_blank(word, blank_space, blank_list):
    std_key_length = len(identify_blank_spots(blank_space, blank_list)) #all keys are the same length
    if(std_key_length > 0): #all keys are not 0-length, so it found the key if it not empty
        blank_space = blank_space[0:std_key_length]
        if word.find(blank_list[blank_space]) >= 0:
            return True
    return False


#identifies the blank and word that correspond based on input
# returns the "key" value for the blank from the dictionary
# e.g. can return "___1___" or "___2___" from an input of "___1___" and the
# corresponding dictionary list
def identify_blank_spots(word, blank_list):
    for blank in blank_list.keys():
        if word.find(blank) >= 0:
            return blank
    return []

# identifies the key for a dictionary entry from the corresponding value
# returns the key for a resulting input value that is in the  "blank" list
# e.g. can return "___1___" or "___2___" from an input of "function" or
# "variables" and the corresponding dictionary list
# returns an empty list if the value does not match the dictionary value
# so no "blank" key is identified in the dictionary
def identify_blanks_from_values(value, blank_list):
    for blank in blank_list:
        #print(blank)
        if value.find(blank_list[blank]) >= 0:
            return blank
    return []




# function replaces all same blanks that use this number (e.g. 1 for __1__) with
# the corresponding dictionary value if a correct answer is input by the user

# inputs include the variable "input" which is a user-entered string,
# the blank_list dictionary, and the vocab_string variable that includes
# all the text in the paragraph as a single string

# outputs the modified vocab_string paragraph that has all the same blanks
# replaced by the correct user input (when it is used in the replace_or_skip_single_word function)
def replace_blanks(input, blank_list, vocab_string):
    replaced_blanks = []
    blank_to_replace = identify_blanks_from_values(input, blank_list)
    vocab_string = vocab_string.split()
    for word in vocab_string:
        if word.find(blank_to_replace)>=0:
            #replace blank with input
            end_punctuation = word.split(blank_to_replace)
            replaced_blanks.append(input + "".join(end_punctuation))
        else:
            replaced_blanks.append(word)
    return replaced_blanks

# case where the word is a blank but answer is wrong
# must pass by this blank in the future!
# takes in a word representing a blank or dictionary key and the blank_list
# dictionary
# returns the dictionary key which is used in the replace_or_skip_single_word()
# function later to know to pass certain blanks (no multiple guesses on the
# same blank even if it appears multiple times before the quiz starts from the
# beginning again!)
def move_on(word, blank_list):
    print("Sorry, wrong answer! Try again!" + "\n")
    for blank in blank_list:
        if word.find(blank) >= 0:
            return blank
    return []


# show the words that are left to be guessed
# removes words as they are correctly guessed
# only prints text, no variables returned
# e.g. 'The words remaining that can be used are:
#      variables   None   --> current list of vocab words left to guess
# Note: modified so that the words are in a randomized order, so
# that the player does not just fill in the answers as they appear and win!
def words_remaining(filled_blanks, blank_list):
    remaining_words = []
    randomized_rem_words = []
    print("\n" + "The words remaining that can be used are: ")
    for blank in blank_list:
        if not(blank in filled_blanks):
            remaining_words.append(blank_list[blank])
    for i in range(len(remaining_words)): #loop randomizes the list of words remaining
        n = random.randint(0, len(remaining_words)-1)
        randomized_rem_words.append(remaining_words[n])
        del(remaining_words[n])
    print("\n" + (" "*4).join(randomized_rem_words) + "\n"*2) #shows the player the remaining words in random order



# loops over the game, after declaring variables

# variables are initialized and then passed into the play_game() function
# takes in the vocab_string variable which is the paragraph of text for this level
# takes in the blank_list dictionary variable which is the answer key for this level

# outputs text for the user to follow (mostly instructions)
def game_loop_to_completion(vocab_string, blank_list):
    replaced = [] #initialize variables
    total_passed = []
    orig_input_string = vocab_string
    vocab_string = vocab_string.split()
    words_remaining([], blank_list)
    while len(total_passed)<len(blank_list): #loop until game is over
        vocab_string, total_passed = play_game(vocab_string, orig_input_string, blank_list, total_passed)
        print(" ".join(vocab_string) + "\n")
        if not(len(total_passed) == len(blank_list)):
            words_remaining(total_passed, blank_list)
    print("\n" + "Congratulations!")





# function iterates over a for loop to check blanks and replaces blanks
# upon correct answers

# Main algorithm for this project

# Inputs are the earlier_replacements - which contains all the replacements made
# up to this point in the loop in this function - so it is initially empty but useful later,
# the blank_list dictionary that is the answer_key,
# the vocab_string paragraph that is responsible for updating over each iteration
# of the play_game function this function supports, with changes actually made in this function,
# the current_vocab_string paragraph that shows the current form of the paragraph string that started with no answers and all blanks,
# the total_passed list that contains all the correct answers thus far

# Outputs are the earlier_replacements list that contains the updates from this play_game function session,
# the vocab_string list that includes everything that was modified after the earlier_replacements list ends,
# and the total_passed list that may have been updated to include more answers the player guessed correctly

def replace_or_skip_single_word(earlier_replacements, blank_list, vocab_string, current_vocab_string, total_passed):
    orig_total_passed_num = len(total_passed)
    for word in current_vocab_string.split(" "):
        while word_is_blank(word, blank_list):
            user_input = input("Type in your guess to replace the blank: " + word + " ")
            if correct_word_in_blank(user_input, word, blank_list):
                print("That's correct! "+ "\n"*2) #blank was found and player's answer was correct!
                start_index = current_vocab_string.find(word) #finds the first index of this blank
                earlier_replacements = vocab_string # container for all earlier words in split paragraph list object
                vocab_string = replace_blanks(user_input, blank_list, current_vocab_string[start_index:]) #replaces this and all subsequent blanks with correct answer
                total_passed.append(''.join(identify_blanks_from_values(user_input, blank_list)))
                break
            else: #blank was found but player's answer is wrong!
                print("Sorry, that's wrong! " + "\n"*2 + "Please try again:" + "\n")
        if len(total_passed)>orig_total_passed_num: #breaks out of loop if blank was replaced with correct word
            break
        vocab_string.append(word) #adds non-blank words back to output list
    return earlier_replacements, vocab_string, total_passed


# Plays a full game of the Vocabulary Game.
# Looped by the game_loop_to_completion function so that they player can keep trying until
# all vocab words are filled in correctly

# Inputs include the vocab_string string variable that represents the current form of the paragraph, inc. answers
# and the orig_input_string, which is the original form of the paragraph before any answers were filled in,
# and the blank_list dictionary variable that is the answer key
# and the total_passed list that contains the words the players has entered correctly before now

# First output is the modified vocab_string variable that is a string representing the current form
# of the paragraph, answers included!
# Final output is the total_passed list variable that contains all the correctly used vocab words
def play_game(vocab_string, orig_input_string, blank_list, total_passed):
    current_vocab_string = " ".join(vocab_string)
    print(current_vocab_string + "\n") #prints the current form of the text
    vocab_string = [] #initialize variables as empty
    earlier_replacements = []
    earlier_replacements, vocab_string, total_passed = replace_or_skip_single_word(earlier_replacements, blank_list, vocab_string, current_vocab_string, total_passed)
    vocab_string = (earlier_replacements + vocab_string) #stitches the list back up to a string
    return vocab_string, total_passed


# allows the player to select the level for the code on startup
# takes in the list of possible answers for a level (e.g. ["easy", "medium", "hard"])
# returns the desired level (string) from the player based on their input
def get_level_from_player(levels_list):
    print("Hello, welcome to the Vocabulary Game!")
    print("You enter vocabulary words correctly to fill in blanks in paragraphs to win!")
    level_known = False
    while level_known == False:
        selected_level = input("Please enter desired level (easy / medium / hard): ")
        if (selected_level in levels_list):
            level_known = True
            return selected_level
        else:
            print("Sorry, cannot recognize your level selection. " + "\n")
            print("Please enter one of the levels as shown (e.g. easy medium hard)! ")


# gets a dictionary and paragraph and puts them into a list together
# inputs are the dict dictionary variable and the corresponding para string
# variable that are the answer key and paragraph that correspond to each other
# outputs a list with the dictionary variable first and the string variable second
def make_dict_para_pairs(dict, para):
    return [dict, para]

# gets dictionary and paragraph lists and makes them a larger, nested list
# that contains all the possible "levels" or scenarios for this game
# The inputs include a level count integer number that corresponds to the number of levels (e.g. 3 for easy, medium, and hard)
# The second input is a base string name for a dictionary file, so that the dictionary
# files for three levels could be dict1, dict2, and dict3, but the BASE name is "dict"
# The last input is similar to the second input, but is a base string name for the
# paragraphs for each level - so they could be para1, para2, and para3, but the BASE name is "para"
# outputs a list that contains [[dict1, para1], [dict2, para2], ...] containing all levels
def dict_para_pairs_to_list(level_count, dict_base_name, para_base_name):
    complete_list = []
    for level in range(level_count):
        normalized_level = level + 1
        dict_current_level = dict_base_name + str(normalized_level)
        para_current_level = para_base_name + str(normalized_level)
        partial_list = make_dict_para_pairs(eval(dict_current_level), eval(para_current_level))
        complete_list.append(partial_list)
    return complete_list


# gets the player's desired level, then determines which paragraph and dictionary to use for the game!
# dictionary - paragraph pairings as input, and then correctly identifies which dictionary and paragraph to use
# and returns the correct dictionary - paragraph pairing
# The input is a nested list as constructed from the above dict_para_pairs_to_list() function
# output is the dictionary - paragraph list for the user-slected difficulty level
def get_dict_para_pairing(levels_list, nested_list):
    entered_level = get_level_from_player(levels_list)
    index = 0
    for level in levels_list:
        if entered_level == level:
            return nested_list[index]
        index += 1



# starts up the game, includes all the info before the game starts,
# including the intro and level selection (sets up the pairings, too - like loading the game!)
# returns the correct nested list pairing to plug into the consequent
# function that actually runs the game

# Inputs are the list of levels (levels_list), the base string for the dictionary
# variable names, and the base string for the paragraph variable names (e.g. "paragraph"
# for "paragraph1", "paragraph2", "paragraph3", etc.)
def starting_game(levels_list, dict_base_name, para_base_name):
    full_nested_list = dict_para_pairs_to_list(len(levels_list), dict_base_name, para_base_name)
    return get_dict_para_pairing(levels_list, full_nested_list)





# Top-level function that actually runs the game!

# Inputs are the list of levels (levels_list), the base string for the dictionary
# variable names, and the base string for the paragraph variable names (e.g. "paragraph"
# for "paragraph1", "paragraph2", "paragraph3", etc.)

# These inputs should be found at the beginning of this file and can be modified to change the game content
# They could also be linked to another file, but that is more advanced

# outputs are all text from sub-functions running (which is the whole game!)
def execute_this_game(levels_list, dict_base_name, para_base_name):
    dict_para_pairing = starting_game(levels_list, dict_base_name, para_base_name)
    game_loop_to_completion(dict_para_pairing[1], dict_para_pairing[0])



# Code below runs this game when the file is run in a Python-pathed terminal!
# (Assuming the terminal has been navigated to the folder containing it!)

execute_this_game(level_selections, "blank_list", "paragraph")

# ----------Instructions for running the program from a terminal---------------
# cmd window text to python program:
# python -i fill-in-the-blanks_version_2.py
