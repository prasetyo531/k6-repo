#!/bin/bash

set -e

echo "📦 Checking for K6 installation..."

if ! command -v k6 &> /dev/null; then
  echo "🔧 K6 not found. Installing..."

  sudo apt update
  sudo apt install -y gnupg software-properties-common curl

  curl -s https://dl.k6.io/key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/k6-archive-keyring.gpg
  echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | \
    sudo tee /etc/apt/sources.list.d/k6.list

  sudo apt update
  sudo apt install -y k6

  echo "✅ K6 installed successfully."
else
  echo "✅ K6 is already installed."
fi