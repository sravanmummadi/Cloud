import csv
import time
import MySQLdb as mysql

"""
CREATE TABLE proc_codes_project2 (
  `ROW_ID` int(11) NOT NULL AUTO_INCREMENT,
  `RECORD_ID` int(11) DEFAULT NULL,
  `PROC_CODE` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ROW_ID`),
  UNIQUE KEY `row_id_UNIQUE` (`ROW_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;


"""


def del_none(d):
    dup=d
    for value in dup:
        if value is ' ':
            dup.remove(value)
        elif isinstance(value, list):
            del_none(value)
    return (dup)



dbcon=mysql.connect(host="127.0.0.1",user="root",passwd="manager",db="db1")
i=1
x=dbcon.cursor()
with open("proc_data_prod.csv", mode='rb') as fo:
    reader = csv.reader(fo,delimiter=',')
    reader.next()
    for row in reader:
        cleaned_row= del_none(del_none(del_none(del_none(del_none(row)))))
        if len(cleaned_row)>1:
            clean_data= list(cleaned_row)
            temp = cleaned_row[0]
            clean_data.remove(temp)
            for item in clean_data:
                #print "The record_number : "+ cleaned_row[0]
                #print "The Item : "+item
                x.execute('INSERT INTO proc_codes_project2 (record_id,proc_code)VALUES("%s", "%s");',(int(cleaned_row[0]),item)
                  )
		x.execute("COMMIT;")
                print "Record "+str(i)+" got inserted."
                i+=1
                dbcon.commit
            dbcon.commit
        #raw_input("Press Enter to Continue :")
    dbcon.commit

#['RECORD_ID', 'PROCEDURE_CODE_1', 'PROCEDURE_CODE_2', 'PROCEDURE_CODE_3', 'PROCEDURE_CODE_4', 'PROCEDURE_CODE_5', 'PROCEDURE_CODE_6', 'PROCEDURE_CODE_7', 'PROCEDURE_CODE_8', 'PROCEDURE_CODE_9', 'PROCEDURE_CODE_10', 'PROCEDURE_CODE_11', 'PROCEDURE_CODE_12', 'PROCEDURE_CODE_13', 'PROCEDURE_CODE_14', 'PROCEDURE_CODE_15', 'PROCEDURE_CODE_16', 'PROCEDURE_CODE_17', 'PROCEDURE_CODE_18', 'PROCEDURE_CODE_19', 'PROCEDURE_CODE_20', 'PROCEDURE_CODE_21', 'PROCEDURE_CODE_22', 'PROCEDURE_CODE_23', 'PROCEDURE_CODE_24', 'PROCEDURE_CODE_25']
dbcon.commit
dbcon.close()
