import csv
import time
import MySQLdb as mysql

dbcon=mysql.connect(host="127.0.0.1",user="root",passwd="root",db="db1")
st = time.time()
x=dbcon.cursor()
i=1
with open("TEXAS.csv", mode='rb') as fo:
    
    reader = csv.reader(fo,delimiter=',')
    reader.next()
    for row in reader:
        recordrow = []
        recordrow.append(str(i))
        for item in row:
            recordrow.append(item)
        var_string = ', '.join("?" * len(recordrow))
        params = ['%s' for item in recordrow]
        sql    = 'INSERT INTO db1.project2 VALUES (%s);' % ','.join(params)
        x.execute(sql,recordrow)
        #print "Record "+str(i)+" got inserted."
        i+=1
    dbcon.commit()
    et = time.time()
    #print str(et-st) + " Seconds to insert data."



dbcon.close()
