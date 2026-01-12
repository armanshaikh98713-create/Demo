#!/bin/bash

REPORT=/tmp/health_report.txt

echo "System Health Report" > $REPORT
echo "Date: $(date)" >> $REPORT
echo "----------------------" >> $REPORT

echo "CPU Load:" >> $REPORT
uptime >> $REPORT

echo "" >> $REPORT
echo "Memory Usage:" >> $REPORT
free -h >> $REPORT

echo "" >> $REPORT
echo "Disk Usage:" >> $REPORT
df -h / >> $REPORT

echo "" >> $REPORT
echo "Running Processes:" >> $REPORT
ps -e | wc -l >> $REPORT

# Send email
#mail -s "System Health Report" yourmail@gmail.com < $REPORT
