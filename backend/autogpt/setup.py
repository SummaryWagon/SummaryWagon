"""Set up the AI and its goals"""
from colorama import Fore, Style

from autogpt import utils
from autogpt.config.ai_config import AIConfig
from autogpt.logs import logger


def prompt_user() -> AIConfig:
    """Prompt the user for input

    Returns:
        AIConfig: The AIConfig object containing the user's input
    """
    ai_name = ""
    # Construct the prompt
    logger.typewriter_log(
        "Welcome to Auto-GPT! ",
        Fore.GREEN,
        "run with '--help' for more information.",
        speak_text=True,
    )

    logger.typewriter_log(
        "Create an AI-Assistant:",
        Fore.GREEN,
        "Enter the name of your AI and its role below. Entering nothing will load"
        " defaults.",
        speak_text=True,
    )

    # Get AI Name from User
    logger.typewriter_log(
        "Name your AI: ", Fore.GREEN, "For example, 'Entrepreneur-GPT'"
    )
    # ai_name = utils.clean_input("AI Name: ")
    ai_name = "Early-developer"
    if ai_name == "":
        ai_name = "Entrepreneur-GPT"

    logger.typewriter_log(
        f"{ai_name} here!", Fore.LIGHTBLUE_EX, "I am at your service.", speak_text=True
    )

    # Get AI Role from User
    logger.typewriter_log(
        "Describe your AI's role: ",
        Fore.GREEN,
        "For example, 'an AI designed to autonomously develop and run businesses with"
        " the sole goal of increasing your net worth.'",
    )
    # ai_role = utils.clean_input(f"{ai_name} is: ")
    ai_role = "an AI designed to autonomously search articles and store in the txt file for the service"
    if ai_role == "":
        ai_role = "an AI designed to autonomously develop and run businesses with the"
        " sole goal of increasing your net worth."

    # Enter up to 5 goals for the AI
    logger.typewriter_log(
        "Enter up to 5 goals for your AI: ",
        Fore.GREEN,
        "For example: \nIncrease net worth, Grow Twitter Account, Develop and manage"
        " multiple businesses autonomously'",
    )
    print("Enter nothing to load defaults, enter nothing when finished.", flush=True)
    
    """ToDo: 추후 토픽에 따른 구문 변경 필요 (api request와 연동)"""
    ai_goals = [
        "find the most recent and popular tech blogs at this moment"
        "the articles should be closely related to AI" # put the topic here
        "the article could be found either on blogs or medias that should be accessible for everyone"
        "After finding five articles, put the titles and website links of the content in a txt file"
        "terminate"
    ]
    # loop 5번 제거
    # for i in range(5):
    #     ai_goal = utils.clean_input(f"{Fore.LIGHTBLUE_EX}Goal{Style.RESET_ALL} {i+1}: ")
    #     if ai_goal == "":
    #         break
    #     ai_goals.append(ai_goal)
    # if not ai_goals:
    #     ai_goals = [
    #         "Increase net worth",
    #         "Grow Twitter Account",
    #         "Develop and manage multiple businesses autonomously",
    #     ]

    return AIConfig(ai_name, ai_role, ai_goals)
