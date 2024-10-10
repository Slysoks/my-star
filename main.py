import requests

uri = "https://data.explore.star.fr/"

limit = 20
timezone = "Europe/Paris"
short_line_name = "C5"
destination = "Saint-Laurent"
stop = "Le Blizz"

dataset_name = "tco-bus-circulation-passages-tr"

parameters = [
  f"limit={limit}",
  f"timezone={timezone}",
  f"refine=nomcourtligne:\"{short_line_name}\"",
  f"refine=destination:\"{destination}\"",
  f"refine=nomarret:\"{stop}\""
]

url = uri + "api/explore/v2.1/catalog/datasets/" + dataset_name + "/records?" + "&".join(parameters)

response = requests.get(url)

if response.status_code == 200:
  print("✅ Data fetched successfully")
else:
  print("❌ Failed to fetch data")
  exit()

data = response.json()

if data["total_count"] == 0:
  print("❌ No data found")
  print(data)
  exit()

# Sort the results by arrival time
sorted = data["results"].sort(key=lambda x: x["arrivee"])

bus = data["results"][0]

arrival_time = bus["arrivee"]
# convert arrival time to local time
arrival_time = arrival_time.replace("T", " ").replace("Z", "")
arrival_time = arrival_time.split(" ")[1]
arrival_time = arrival_time[:5]

print(f"🚌 Next bus at {stop}: {arrival_time}")
