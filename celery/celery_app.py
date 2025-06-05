import tasks
import os
from celery import Celery
from datetime import timedelta

app = Celery(
    "celery_app",
    broker=os.environ.get("CELERY_BROKER_URL"),
    backend=os.environ.get("CELERY_RESULT_BACKEND"),
    include=["tasks.cron"]
)

app.autodiscover_tasks(["tasks"])

app.conf.broker_connection_retry_on_startup = True
app.conf.accept_content = ["json","yaml"]
app.conf.worker_send_task_events = True
app.conf.enable_utc = False
app.conf.timezone = "Asia/Kuala_Lumpur"
app.conf.beat_schedule = {
    "fetch_": {
        "task": "tasks.cron.say_hello",
        "schedule": timedelta(minutes=10),
    }
}
