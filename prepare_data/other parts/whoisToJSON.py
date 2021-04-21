import csv
import json


def load_csv_whois(csv_file):
    csv_content = dict()
    start = True
    colum_names = list()

    with open(csv_file, encoding='utf-8') as file:

        csv_reader = csv.reader(file, delimiter=",")
        for records in csv_reader:
            if start:
                colum_names = records
                start = False
            else:
                record = dict()
                for number, colum_name in enumerate(colum_names):
                    record[colum_name] = records[number]
                csv_content[records[1]] = record

            #print(records)

    return csv_content


def load_csv_whois_as_DB(csv_file, sql_dump_file):
    csv_content = dict()
    start = True
    next = False
    colum_names = list()

    create_table_text = "CREATE TABLE whois ( \nid SERIAL PRIMARY KEY,\n"
    record_insert = "INSERT INTO whois ("
    with open(sql_dump_file, "w", encoding='utf-8') as sql_file:
        with open(csv_file, encoding='utf-8') as file:

            csv_reader = csv.reader(file, delimiter=",")
            for records in csv_reader:
                if start:
                    colum_names = records[1:]
                    record_insert = record_insert + colum_names[0]

                    if len(colum_names[0].split('date')) > 1:
                        create_table_text = create_table_text + "" + colum_names[0].replace("'", "\\'") + " text\n"
                    else:
                        create_table_text = create_table_text + "" + colum_names[0].replace("'", "\\'") + " text\n"

                    for colum_name in colum_names[1:]:
                        if len(colum_name.split('date')) > 1:
                            create_table_text = create_table_text + ",\n" + colum_name.replace("'", "\\'") + " text"
                        else:
                            create_table_text = create_table_text + ",\n" + colum_name.replace("'", "\\'") + " text"
                        record_insert = record_insert + ", " + colum_name

                    #record_insert = record_insert[::-1].replace(",", "", 1)[::-1]
                    record_insert = record_insert + ") VALUES\n"
                    create_table_text = create_table_text + "); \n"

                    sql_file.write(create_table_text)
                    sql_file.write(record_insert)

                    print(create_table_text)
                    print(record_insert)

                    start = False
                else:
                    if not next:
                        insert = " ( '" + records[1].replace("'", "''") + "'"
                        next = True
                    else:
                        insert = ",\n( '" + records[1].replace("'", "''") + "'"

                    for record in records[2:]:
                        insert = insert + ", '" + record.replace("'", "''") + "'"
                    insert = insert + ")"

                    sql_file.write(insert)

            sql_file.write(";")
            #print(records)


def save_json(json_file, structure):
    with open(json_file, "w", encoding='utf-8') as file:
        json.dump(structure, file)


def parse_csv_whois(csv_reader):
    csv_content = dict()

    for records in csv_reader:
        print(records)

    return csv_content


def create_whois_json(csv_file_path, json_file_path):
    csv_content = load_csv_whois(csv_file_path)
    save_json(json_file_path, csv_content)


#create_whois_json('full-database.csv', 'full-database.json')
load_csv_whois_as_DB('full-database.csv', 'new.sql')
