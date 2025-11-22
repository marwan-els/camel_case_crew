import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()


# 1. SETUP
API_KEY = os.getenv("ELEVENLABS_API_KEY")
BASE_URL = "https://api.elevenlabs.io/v1/convai/tools"

headers = {
    "xi-api-key": API_KEY,
    "Content-Type": "application/json"
}

tools_to_create = [
    # --- Tool 1: Get Booking ---
    # --- Tool 1: Get Booking ---
    {
        "tool_config": {
            "type": "webhook",
            "name": "get_booking_details",
            "description": "Retrieves details of the current booking using the booking ID.",
            "api_schema": {
                "url": "https://hackatum25.sixt.io/api/booking/{booking_id}",
                "method": "GET",
                "path_params_schema": {
                    "booking_id": { 
                        "type": "string",
                        "description": "The unique identifier for the booking (e.g. 12345)" # <--- ADDED THIS
                    } 
                }
            }
        }
    },
    # --- Tool 2: Get Vehicles (Upsell) ---
    {
        "tool_config": {
            "type": "webhook",
            "name": "get_available_vehicles",
            "description": "Fetches a list of available vehicles that the customer can upgrade to.",
            "api_schema": {
                "url": "https://hackatum25.sixt.io/api/booking/{booking_id}/vehicles",
                "method": "GET",
                "path_params_schema": {
                    "booking_id": { 
                        "type": "string",
                        "description": "The unique identifier for the booking" 
                    }
                }
            }
        }
    },
    # --- Tool 3: Get Protection ---
    {
        "tool_config": {
            "type": "webhook",
            "name": "get_protection_packages",
            "description": "Fetches available protection and insurance packages.",
            "api_schema": {
                "url": "https://hackatum25.sixt.io/api/booking/{booking_id}/protections",
                "method": "GET",
                "path_params_schema": {
                    "booking_id": { 
                        "type": "string",
                        "description": "The unique identifier for the booking"
                    }
                }
            }
        }
    },
    # --- Tool 4: Get Addons ---
    {
        "tool_config": {
            "type": "webhook",
            "name": "get_available_addons",
            "description": "Fetches optional add-ons like GPS, baby seats, or additional drivers.",
            "api_schema": {
                "url": "https://hackatum25.sixt.io/api/booking/{booking_id}/addons",
                "method": "GET",
                "path_params_schema": {
                    "booking_id": { 
                        "type": "string",
                        "description": "The unique identifier for the booking"
                    }
                }
            }
        }
    },
    # --- Tool 5: Assign Vehicle (POST) ---
    {
        "tool_config": {
            "type": "webhook",
            "name": "assign_vehicle_to_booking",
            "description": "Assigns a specific vehicle to the booking (upgrade).",
            "api_schema": {
                "url": "https://hackatum25.sixt.io/api/booking/{booking_id}/vehicles/{vehicle_id}",
                "method": "POST",
                "path_params_schema": {
                    "booking_id": { 
                        "type": "string",
                        "description": "The unique identifier for the booking"
                    },
                    "vehicle_id": { 
                        "type": "string",
                        "description": "The ID of the vehicle to assign"
                    }
                },
                "request_body_schema": {
                    "type": "object",
                    "properties": {}
                }
            }
        }
    },
    # --- Tool 6: Assign Protection (POST) ---
    {
        "tool_config": {
            "type": "webhook",
            "name": "assign_protection_to_booking",
            "description": "Adds a protection package to the booking.",
            "api_schema": {
                "url": "https://hackatum25.sixt.io/api/booking/{booking_id}/protections/{package_id}",
                "method": "POST",
                "path_params_schema": {
                    "booking_id": { 
                        "type": "string",
                        "description": "The unique identifier for the booking"
                    },
                    "package_id": { 
                        "type": "string",
                        "description": "The ID of the protection package to assign"
                    }
                },
                "request_body_schema": {
                    "type": "object",
                    "properties": {}
                }
            }
        }
    },
    # --- Tool 7: Complete Booking (POST) ---
    {
        "tool_config": {
            "type": "webhook",
            "name": "complete_booking",
            "description": "Finalizes the booking process.",
            "api_schema": {
                "url": "https://hackatum25.sixt.io/api/booking/{booking_id}/complete",
                "method": "POST",
                "path_params_schema": {
                    "booking_id": { 
                        "type": "string",
                        "description": "The unique identifier for the booking"
                    }
                },
                "request_body_schema": {
                    "type": "object",
                    "properties": {}
                }
            }
        }
    },
    # --- Tool 8: Blink Lights (POST - No Path Params) ---
    {
        "tool_config": {
            "type": "webhook",
            "name": "car_blink_lights",
            "description": "Makes the demo car blink its lights.",
            "api_schema": {
                "url": "https://hackatum25.sixt.io/api/car/blink",
                "method": "POST",
                "request_body_schema": {
                    "type": "object",
                    "properties": {}
                }
            }
        }
    },
    # --- Tool 9: Unlock Car (POST - No Path Params) ---
    {
        "tool_config": {
            "type": "webhook",
            "name": "car_unlock",
            "description": "Unlocks the demo car.",
            "api_schema": {
                "url": "https://hackatum25.sixt.io/api/car/unlock",
                "method": "POST",
                "request_body_schema": {
                    "type": "object",
                    "properties": {}
                }
            }
        },
    },
    # --- Tool 10: Lock Car (POST - No Path Params) ---
    {
        "tool_config": {
            "type": "webhook",
            "name": "car_lock",
            "description": "Locks the demo car.",
            "api_schema": {
                "url": "https://hackatum25.sixt.io/api/car/lock",
                "method": "POST",
                "request_body_schema": {
                    "type": "object",
                    "properties": {}
                }
            }
        }
    }
]

# 3. EXECUTION LOOP
print(f"Starting creation of {len(tools_to_create)} tools...")

for tool in tools_to_create:
    tool_name = tool['tool_config']['name']
    try:
        response = requests.post(BASE_URL, headers=headers, json=tool)
        
        if response.status_code == 200:
            tool_id = response.json().get('id')
            print(f"✅ Success: {tool_name} (ID: {tool_id})")
        else:
            print(f"❌ Failed: {tool_name} - Status: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"❌ Error connecting for {tool_name}: {str(e)}")

print("--- Done ---")