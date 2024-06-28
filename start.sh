sudo pm2 start npm --name "production-analysis-service" -l /app/logs/production-analysis-service.log --merge-logs -- run local_v1
sudo pm2 save