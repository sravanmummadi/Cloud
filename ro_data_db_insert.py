import csv
import time
import MySQLdb as mysql

"""
CREATE TABLE db1.`project2` (
  `RECORD_ID` int primary key not null auto_increment,
  `NATIONAL_PROVIDER_ID` int(11) DEFAULT NULL,
  `LENGTH_OF_STAY` int(11) DEFAULT NULL,
  `AGE` int(11) DEFAULT NULL,
  `SEX` int(11) DEFAULT NULL,
  `RACE` int(11) DEFAULT NULL,
  `DAY_OF_ADMISSION` int(11) DEFAULT NULL,
  `DISCHARGE_STATUS` int(11) DEFAULT NULL,
  `STAY_INDICATOR` text,
  `ADMISSION_DATE` int(11) DEFAULT NULL,
  `DISCHARGE_DATE` int(11) DEFAULT NULL,
  `DRG_PRICE` int(11) DEFAULT NULL,
  `TOTAL_CHARGES` int(11) DEFAULT NULL,
  `COVERED_CHARGES` int(11) DEFAULT NULL,
  `SURGERY_INDICATOR` int(11) DEFAULT NULL,
 `DRG_CODE` int(11) DEFAULT NULL,
  `DISCHARGE_DESTINATION` int(11) DEFAULT NULL,
  `SOURCE_OF_ADMISSION` text,
  `TYPE_OF_ADMISSION` int(11) DEFAULT NULL,
  `ADMITTING_DIAGNOSIS_CODE` text,
  `ADMISSION_TO_DEATH_INTERVAL` int(11) DEFAULT NULL,
  `PROVIDER_CITY_NAME` text,
  `PROVIDER_ZIP_CODE` text
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  alter table proc_codes_project2 auto_increment=1;
"""


dbcon=mysql.connect(host="127.0.0.1",user="root",passwd="manager",db="db1")
x=dbcon.cursor()
i=1
with open("REST_OF_THE_DATA_PROD.CSV", mode='rb') as fo:
    reader = csv.reader(fo,delimiter=',')
    reader.next()
    for row in reader:
        resultlist={}
        resultlist['NATIONAL_PROVIDER_ID']=int(row[0])
        resultlist['LENGTH_OF_STAY']=int(row[1])
        resultlist['AGE']=int(row[2])
        resultlist['SEX']=int(row[3])
        resultlist['RACE']=int(row[4])
        resultlist['DAY_OF_ADMISSION']=int(row[5])
        resultlist['DISCHARGE_STATUS']=int(row[6])
        resultlist['STAY_INDICATOR']=row[7]
        resultlist['ADMISSION_DATE']=int(row[8])
        resultlist['DISCHARGE_DATE']=int(row[9])
        resultlist['DRG_PRICE']=int(row[10])
        resultlist['TOTAL_CHARGES']=int(row[11])
        resultlist['COVERED_CHARGES']=int(row[12])
        resultlist['SURGERY_INDICATOR']=int(row[13])
        resultlist['DRG_CODE']=int(row[14])
        resultlist['DISCHARGE_DESTINATION']=int(row[15])
        resultlist['SOURCE_OF_ADMISSION']=row[16]
        resultlist['TYPE_OF_ADMISSION']=int(row[17])
        resultlist['ADMITTING_DIAGNOSIS_CODE']= row[18]
        resultlist['ADMISSION_TO_DEATH_INTERVAL']=int(row[19])
        resultlist['PROVIDER_CITY_NAME']=row[20]
        resultlist['PROVIDER_ZIP_CODE']=row[21]
        print resultlist
        x.execute('INSERT INTO PROJECT2(NATIONAL_PROVIDER_ID, LENGTH_OF_STAY, AGE, SEX, RACE, DAY_OF_ADMISSION, DISCHARGE_STATUS, STAY_INDICATOR, ADMISSION_DATE, DISCHARGE_DATE, DRG_PRICE, TOTAL_CHARGES, COVERED_CHARGES, SURGERY_INDICATOR, DRG_CODE, DISCHARGE_DESTINATION, SOURCE_OF_ADMISSION, TYPE_OF_ADMISSION, ADMITTING_DIAGNOSIS_CODE, ADMISSION_TO_DEATH_INTERVAL, PROVIDER_CITY_NAME, PROVIDER_ZIP_CODE )VALUES("%s", "%s", "%s","%s","%s", "%s", "%s","%s", "%s", "%s","%s","%s", "%s", "%s","%s", "%s", "%s","%s","%s", "%s", "%s","%s")',
                  (resultlist["NATIONAL_PROVIDER_ID"], resultlist["LENGTH_OF_STAY"], resultlist["AGE"], resultlist["SEX"], resultlist["RACE"], resultlist["DAY_OF_ADMISSION"], resultlist["DISCHARGE_STATUS"], resultlist["STAY_INDICATOR"], resultlist["ADMISSION_DATE"], resultlist["DISCHARGE_DATE"], resultlist["DRG_PRICE"], resultlist["TOTAL_CHARGES"], resultlist["COVERED_CHARGES"], resultlist["SURGERY_INDICATOR"], resultlist["DRG_CODE"], resultlist["DISCHARGE_DESTINATION"], resultlist["SOURCE_OF_ADMISSION"], resultlist["TYPE_OF_ADMISSION"], resultlist["ADMITTING_DIAGNOSIS_CODE"], resultlist["ADMISSION_TO_DEATH_INTERVAL"], resultlist["PROVIDER_CITY_NAME"], resultlist["PROVIDER_ZIP_CODE"])
                  )
        #x.execute("COMMIT;")
        #raw_input("Please press enter :")
        i+=1
    dbcon.commit()


#['NATIONAL_PROVIDER_ID', 'LENGTH_OF_STAY', 'AGE', 'SEX', 'RACE', 'DAY_OF_ADMISSION', 'DISCHARGE_STATUS', 'STAY_INDICATOR', 'ADMISSION_DATE', 'DISCHARGE_DATE', 'DRG_PRICE', 'TOTAL_CHARGES', 'COVERED_CHARGES', 'SURGERY_INDICATOR', 'DRG_CODE', 'DISCHARGE_DESTINATION', 'SOURCE_OF_ADMISSION', 'TYPE_OF_ADMISSION', 'ADMITTING_DIAGNOSIS_CODE', 'ADMISSION_TO_DEATH_INTERVAL', 'PROVIDER_CITY_NAME', 'PROVIDER_ZIP_CODE']
dbcon.commit()
dbcon.close()