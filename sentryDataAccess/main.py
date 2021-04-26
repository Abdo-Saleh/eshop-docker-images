# need installed as cmd tool - for me it works inside conda env
# import sentry2csv
import os


# api token can be found inside project: https://sentry.io/settings/account/api/auth-tokens/
# https://sentry.io/settings/jakub-perdek/projects/cyran/
# sentry_org="jakub-perdek" is from link above
# sentry_project="cyran" is project after projects in link above
def call_sentry(api_token, sentry_org="jakub-perdek", sentry_project="cyran"):
    os.system("sentry2csv --token "+api_token + " " + sentry_org + " " + sentry_project)


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    call_sentry("63edc2fe417541bdaca9d1866469bbf9b977d99ffcf64be18fd37c831b9f1f3f")