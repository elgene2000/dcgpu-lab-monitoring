# Use slim Python 3.10 base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 5000

# Copy project files
COPY . .


# Run the Flask app
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]