export interface HardwarePin {
  name: string;
  desc: string;
}

export interface WiringMapping {
  sensorPin: string;
  boardPin: string;
}

export interface BoardWiring {
  boardName: string;
  boardImage: string;
  mappings: WiringMapping[];
  boardPins: string[];
}

export interface HardwareDetails {
  id: string;
  name: string;
  image: string;
  shortDesc: string;
  longDesc: string;
  whatItDoes: string;
  pins: HardwarePin[];
  wiring?: Record<'esp32' | 'arduino', BoardWiring>;
}

export const hardwareData: HardwareDetails[] = [
  {
    "id": "arduino_uno",
    "name": "Arduino Uno ",
    "image": "/images/hardware/arduino_uno_1783075686637.png",
    "shortDesc": "32-bit ARM Cortex-M4 Microcontroller",
    "longDesc": "The Arduino UNO R4 Minima brings the 32-bit computing power of the Renesas RA4M1 microcontroller to the classic UNO form factor.",
    "whatItDoes": "Acts as the brain for simple to moderately complex electronics projects, reading sensors and controlling outputs.",
    "pins": [
      {
        "name": "5V/3.3V",
        "desc": "Power supply pins"
      },
      {
        "name": "GND",
        "desc": "Ground pins"
      },
      {
        "name": "A0-A5",
        "desc": "Analog input pins"
      },
      {
        "name": "D0-D13",
        "desc": "Digital I/O pins (D3, D5, D6, D9, D10, D11 support PWM)"
      }
    ]
  },
  {
    "id": "esp32",
    "name": "ESP32 Dev Board",
    "image": "/images/hardware/esp32_board_1783075698872.png",
    "shortDesc": "Dual-core WiFi/BT MCU",
    "longDesc": "A powerful, feature-rich MCU with integrated Wi-Fi and Bluetooth capabilities, perfect for IoT applications.",
    "whatItDoes": "Connects your electronics projects to the internet while offering substantial processing power for complex algorithms.",
    "pins": [
      {
        "name": "VIN/3V3",
        "desc": "Power supply pins"
      },
      {
        "name": "GND",
        "desc": "Ground pins"
      },
      {
        "name": "GPIOs",
        "desc": "General purpose I/O pins with advanced multiplexing"
      },
      {
        "name": "ADC/DAC",
        "desc": "Analog inputs and Digital-to-Analog outputs"
      }
    ]
  },
  {
    "id": "hcsr04",
    "name": "HC-SR04",
    "image": "/images/hardware/ultrasonic_sensor_1783075710376.png",
    "shortDesc": "Ultrasonic Distance Sensor",
    "longDesc": "Uses sonar to determine the distance to an object, offering excellent non-contact range detection with high accuracy and stable readings.",
    "whatItDoes": "Measures distance by sending out an ultrasonic pulse and measuring the time it takes for the echo to return.",
    "pins": [
      {
        "name": "VCC",
        "desc": "5V Power Supply"
      },
      {
        "name": "TRIG",
        "desc": "Trigger Input (Sends ultrasonic pulse)"
      },
      {
        "name": "ECHO",
        "desc": "Echo Output (Receives the reflection)"
      },
      {
        "name": "GND",
        "desc": "Ground"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "D9",
          "D10"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "TRIG",
            "boardPin": "D9"
          },
          {
            "sensorPin": "ECHO",
            "boardPin": "D10"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "VIN",
          "GND",
          "G5",
          "G18"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "VIN"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "TRIG",
            "boardPin": "G5"
          },
          {
            "sensorPin": "ECHO",
            "boardPin": "G18"
          }
        ]
      }
    }
  },
  {
    "id": "dht11",
    "name": "DHT11 / DHT22",
    "image": "/images/hardware/dht11_sensor_1783075721243.png",
    "shortDesc": "Temp & Humidity Sensor",
    "longDesc": "A basic, ultra low-cost digital temperature and humidity sensor. It uses a capacitive humidity sensor and a thermistor to measure the surrounding air.",
    "whatItDoes": "Spits out a digital signal on the data pin providing reliable ambient temperature and humidity readings.",
    "pins": [
      {
        "name": "VCC",
        "desc": "3.3V - 5V Power Supply"
      },
      {
        "name": "DATA",
        "desc": "Digital signal output"
      },
      {
        "name": "GND",
        "desc": "Ground"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "D2"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "DATA",
            "boardPin": "D2"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G4"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "DATA",
            "boardPin": "G4"
          }
        ]
      }
    }
  },
  {
    "id": "l298n",
    "name": "L298N",
    "image": "/images/hardware/motor_driver_1783075733447.png",
    "shortDesc": "Dual Motor Driver",
    "longDesc": "A dual H-Bridge motor driver which allows speed and direction control of two DC motors at the same time.",
    "whatItDoes": "Provides the high current needed to drive motors, which microcontrollers cannot supply directly, while interpreting low-current control signals.",
    "pins": [
      {
        "name": "ENA",
        "desc": "PWM input for Motor A speed"
      },
      {
        "name": "IN1",
        "desc": "Direction control 1 for Motor A"
      },
      {
        "name": "IN2",
        "desc": "Direction control 2 for Motor A"
      },
      {
        "name": "IN3",
        "desc": "Direction control 1 for Motor B"
      },
      {
        "name": "IN4",
        "desc": "Direction control 2 for Motor B"
      },
      {
        "name": "ENB",
        "desc": "PWM input for Motor B speed"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "D10",
          "D9",
          "D8",
          "D7",
          "D6",
          "D5"
        ],
        "mappings": [
          {
            "sensorPin": "ENA",
            "boardPin": "D10"
          },
          {
            "sensorPin": "IN1",
            "boardPin": "D9"
          },
          {
            "sensorPin": "IN2",
            "boardPin": "D8"
          },
          {
            "sensorPin": "IN3",
            "boardPin": "D7"
          },
          {
            "sensorPin": "IN4",
            "boardPin": "D6"
          },
          {
            "sensorPin": "ENB",
            "boardPin": "D5"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "G14",
          "G27",
          "G26",
          "G25",
          "G33",
          "G32"
        ],
        "mappings": [
          {
            "sensorPin": "ENA",
            "boardPin": "G14"
          },
          {
            "sensorPin": "IN1",
            "boardPin": "G27"
          },
          {
            "sensorPin": "IN2",
            "boardPin": "G26"
          },
          {
            "sensorPin": "IN3",
            "boardPin": "G25"
          },
          {
            "sensorPin": "IN4",
            "boardPin": "G33"
          },
          {
            "sensorPin": "ENB",
            "boardPin": "G32"
          }
        ]
      }
    }
  },
  {
    "id": "sg90",
    "name": "SG90 Servo",
    "image": "/images/hardware/servo_motor_1783075744728.png",
    "shortDesc": "Micro Servo Motor",
    "longDesc": "A lightweight, high-quality and lightning-fast servo motor. It can rotate approximately 180 degrees (90 in each direction).",
    "whatItDoes": "Provides precise angular positioning for small robotic arms, steering mechanisms, or camera pans.",
    "pins": [
      {
        "name": "VCC",
        "desc": "5V Power Supply (Red)"
      },
      {
        "name": "GND",
        "desc": "Ground (Brown)"
      },
      {
        "name": "SIG",
        "desc": "PWM Control Signal (Orange)"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "D9"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SIG",
            "boardPin": "D9"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "VIN",
          "GND",
          "G18"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "VIN"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SIG",
            "boardPin": "G18"
          }
        ]
      }
    }
  },
  {
    "id": "mfrc522",
    "name": "MFRC522",
    "image": "/images/hardware/rfid_module_1783075755922.png",
    "shortDesc": "RFID Reader/Writer",
    "longDesc": "A highly integrated reader/writer IC for contactless communication at 13.56 MHz, utilizing SPI communication.",
    "whatItDoes": "Reads data from and writes data to compatible RFID tags or cards for access control and identification.",
    "pins": [
      {
        "name": "3.3V",
        "desc": "Power Supply"
      },
      {
        "name": "RST",
        "desc": "Reset and power-down input"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "MISO",
        "desc": "Master In Slave Out (SPI)"
      },
      {
        "name": "MOSI",
        "desc": "Master Out Slave In (SPI)"
      },
      {
        "name": "SCK",
        "desc": "Serial Clock (SPI)"
      },
      {
        "name": "SDA",
        "desc": "Chip Select / SS (SPI)"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "3.3V",
          "D9",
          "GND",
          "D12",
          "D11",
          "D13",
          "D10"
        ],
        "mappings": [
          {
            "sensorPin": "3.3V",
            "boardPin": "3.3V"
          },
          {
            "sensorPin": "RST",
            "boardPin": "D9"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "MISO",
            "boardPin": "D12"
          },
          {
            "sensorPin": "MOSI",
            "boardPin": "D11"
          },
          {
            "sensorPin": "SCK",
            "boardPin": "D13"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "D10"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "G22",
          "GND",
          "G19",
          "G23",
          "G18",
          "G21"
        ],
        "mappings": [
          {
            "sensorPin": "3.3V",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "RST",
            "boardPin": "G22"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "MISO",
            "boardPin": "G19"
          },
          {
            "sensorPin": "MOSI",
            "boardPin": "G23"
          },
          {
            "sensorPin": "SCK",
            "boardPin": "G18"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "G21"
          }
        ]
      }
    }
  },
  {
    "id": "relay5v",
    "name": "5V Relay",
    "image": "/images/hardware/relay_module_1783075767148.png",
    "shortDesc": "Switching Module",
    "longDesc": "An electrically operated switch that allows you to turn on or off a circuit using voltage and/or current much higher than a microcontroller can handle.",
    "whatItDoes": "Acts as a bridge between low-power electronics and high-power appliances (like lamps, motors, heaters).",
    "pins": [
      {
        "name": "VCC",
        "desc": "Power Supply for electromagnet"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "IN",
        "desc": "Trigger signal (High or Low depending on module)"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "D8"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "IN",
            "boardPin": "D8"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "VIN",
          "GND",
          "G23"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "VIN"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "IN",
            "boardPin": "G23"
          }
        ]
      }
    }
  },
  {
    "id": "ds18b20",
    "name": "DS18B20",
    "image": "/images/hardware/ds18b20.png",
    "shortDesc": "1-Wire Digital Temp Sensor",
    "longDesc": "A digital thermometer provides 9-bit to 12-bit Celsius temperature measurements and has an alarm function with nonvolatile user-programmable upper and lower trigger points.",
    "whatItDoes": "Measures temperature digitally using a single data wire for communication.",
    "pins": [
      {
        "name": "VDD",
        "desc": "Power supply"
      },
      {
        "name": "DQ",
        "desc": "Data in/out"
      },
      {
        "name": "GND",
        "desc": "Ground"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "D2",
          "GND"
        ],
        "mappings": [
          {
            "sensorPin": "VDD",
            "boardPin": "5V"
          },
          {
            "sensorPin": "DQ",
            "boardPin": "D2"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "G4",
          "GND"
        ],
        "mappings": [
          {
            "sensorPin": "VDD",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "DQ",
            "boardPin": "G4"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          }
        ]
      }
    }
  },
  {
    "id": "bmp280",
    "name": "BMP280",
    "image": "/images/hardware/bmp280.png",
    "shortDesc": "Barometric Pressure Sensor",
    "longDesc": "An absolute barometric pressure sensor especially designed for mobile applications.",
    "whatItDoes": "Measures atmospheric pressure and temperature to determine altitude or weather changes.",
    "pins": [
      {
        "name": "VCC",
        "desc": "Power"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "SCL",
        "desc": "I2C Clock"
      },
      {
        "name": "SDA",
        "desc": "I2C Data"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "A5",
          "A4"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SCL",
            "boardPin": "A5"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "A4"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G22",
          "G21"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SCL",
            "boardPin": "G22"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "G21"
          }
        ]
      }
    }
  },
  {
    "id": "tcs34725",
    "name": "TCS34725",
    "image": "/images/hardware/tcs34725.png",
    "shortDesc": "RGB Color Sensor",
    "longDesc": "Provides red, green, blue (RGB) and clear light sensing values.",
    "whatItDoes": "Detects the color of objects or ambient light accurately using optical sensors.",
    "pins": [
      {
        "name": "VIN",
        "desc": "Power"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "SCL",
        "desc": "I2C Clock"
      },
      {
        "name": "SDA",
        "desc": "I2C Data"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "A5",
          "A4"
        ],
        "mappings": [
          {
            "sensorPin": "VIN",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SCL",
            "boardPin": "A5"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "A4"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G22",
          "G21"
        ],
        "mappings": [
          {
            "sensorPin": "VIN",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SCL",
            "boardPin": "G22"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "G21"
          }
        ]
      }
    }
  },
  {
    "id": "bh1750",
    "name": "BH1750",
    "image": "/images/hardware/bh1750.png",
    "shortDesc": "Digital Light Sensor",
    "longDesc": "A digital ambient light sensor IC for I2C bus interface.",
    "whatItDoes": "Measures ambient light intensity in lux without needing complex calculations.",
    "pins": [
      {
        "name": "VCC",
        "desc": "Power"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "SCL",
        "desc": "I2C Clock"
      },
      {
        "name": "SDA",
        "desc": "I2C Data"
      },
      {
        "name": "ADD",
        "desc": "I2C Address"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "A5",
          "A4",
          "D3"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SCL",
            "boardPin": "A5"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "A4"
          },
          {
            "sensorPin": "ADD",
            "boardPin": "D3"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G22",
          "G21",
          "G5"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SCL",
            "boardPin": "G22"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "G21"
          },
          {
            "sensorPin": "ADD",
            "boardPin": "G5"
          }
        ]
      }
    }
  },
  {
    "id": "vl53l0x",
    "name": "VL53L0X",
    "image": "/images/hardware/vl53l0x.png",
    "shortDesc": "Time-of-Flight Distance Sensor",
    "longDesc": "A new generation Time-of-Flight (ToF) laser-ranging module housed in the smallest package on the market.",
    "whatItDoes": "Accurately measures absolute distance up to 2m regardless of target reflectance.",
    "pins": [
      {
        "name": "VIN",
        "desc": "Power"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "SCL",
        "desc": "I2C Clock"
      },
      {
        "name": "SDA",
        "desc": "I2C Data"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "A5",
          "A4"
        ],
        "mappings": [
          {
            "sensorPin": "VIN",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SCL",
            "boardPin": "A5"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "A4"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G22",
          "G21"
        ],
        "mappings": [
          {
            "sensorPin": "VIN",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SCL",
            "boardPin": "G22"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "G21"
          }
        ]
      }
    }
  },
  {
    "id": "hcsr501",
    "name": "HC-SR501 (PIR)",
    "image": "/images/hardware/hcsr501.png",
    "shortDesc": "Passive Infrared Sensor",
    "longDesc": "Based on infrared technology, automatic control module, using Germany imported LHI778 probe design.",
    "whatItDoes": "Detects motion from humans or animals by sensing infrared radiation.",
    "pins": [
      {
        "name": "VCC",
        "desc": "Power"
      },
      {
        "name": "OUT",
        "desc": "Digital Output"
      },
      {
        "name": "GND",
        "desc": "Ground"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "D4",
          "GND"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "5V"
          },
          {
            "sensorPin": "OUT",
            "boardPin": "D4"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "G6",
          "GND"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "OUT",
            "boardPin": "G6"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          }
        ]
      }
    }
  },
  {
    "id": "a3144",
    "name": "A3144 Hall Effect",
    "image": "/images/hardware/a3144.png",
    "shortDesc": "Magnetic Field Sensor",
    "longDesc": "A continuous-time switch with a digital output that triggers when a magnetic field is present.",
    "whatItDoes": "Detects the presence of a magnet, useful for speed measurement or door switches.",
    "pins": [
      {
        "name": "VCC",
        "desc": "Power"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "OUT",
        "desc": "Digital Output"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "D5"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "OUT",
            "boardPin": "D5"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G7"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "OUT",
            "boardPin": "G7"
          }
        ]
      }
    }
  },
  {
    "id": "mpu6050",
    "name": "MPU6050",
    "image": "/images/hardware/mpu6050.png",
    "shortDesc": "6-DOF Accelerometer & Gyro",
    "longDesc": "Contains a MEMS accelerometer and a MEMS gyro in a single chip. It is very accurate, as it contains 16-bits analog to digital conversion hardware for each channel.",
    "whatItDoes": "Tracks orientation and acceleration in 3D space.",
    "pins": [
      {
        "name": "VCC",
        "desc": "Power"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "SCL",
        "desc": "I2C Clock"
      },
      {
        "name": "SDA",
        "desc": "I2C Data"
      },
      {
        "name": "INT",
        "desc": "Interrupt"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "A5",
          "A4",
          "D6"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SCL",
            "boardPin": "A5"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "A4"
          },
          {
            "sensorPin": "INT",
            "boardPin": "D6"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G22",
          "G21",
          "G8"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SCL",
            "boardPin": "G22"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "G21"
          },
          {
            "sensorPin": "INT",
            "boardPin": "G8"
          }
        ]
      }
    }
  },
  {
    "id": "hmc5883l",
    "name": "HMC5883L",
    "image": "/images/hardware/hmc5883l.png",
    "shortDesc": "3-Axis Digital Compass",
    "longDesc": "A multi-chip module designed for low-field magnetic sensing with a digital interface.",
    "whatItDoes": "Measures the Earth's magnetic field to provide heading information (digital compass).",
    "pins": [
      {
        "name": "VCC",
        "desc": "Power"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "SCL",
        "desc": "I2C Clock"
      },
      {
        "name": "SDA",
        "desc": "I2C Data"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "A5",
          "A4"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SCL",
            "boardPin": "A5"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "A4"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G22",
          "G21"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SCL",
            "boardPin": "G22"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "G21"
          }
        ]
      }
    }
  },
  {
    "id": "ky038",
    "name": "KY-038",
    "image": "/images/hardware/ky038.png",
    "shortDesc": "Sound Sensor Module",
    "longDesc": "Features a microphone and an LM393 comparator to detect sound.",
    "whatItDoes": "Detects acoustic sound and outputs a digital signal when noise crosses a threshold.",
    "pins": [
      {
        "name": "A0",
        "desc": "Analog Output"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "VCC",
        "desc": "Power"
      },
      {
        "name": "D0",
        "desc": "Digital Output"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "A0",
          "GND",
          "5V",
          "D7"
        ],
        "mappings": [
          {
            "sensorPin": "A0",
            "boardPin": "A0"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "VCC",
            "boardPin": "5V"
          },
          {
            "sensorPin": "D0",
            "boardPin": "D7"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "G34",
          "GND",
          "3V3",
          "G9"
        ],
        "mappings": [
          {
            "sensorPin": "A0",
            "boardPin": "G34"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "VCC",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "D0",
            "boardPin": "G9"
          }
        ]
      }
    }
  },
  {
    "id": "flame",
    "name": "Flame Sensor",
    "image": "/images/hardware/flame.png",
    "shortDesc": "Fire Detection Sensor",
    "longDesc": "Can detect a flame or a light source of a wavelength in the range of 760nm-1100nm.",
    "whatItDoes": "Used for fire alarms or fire-fighting robots to detect the presence of fire.",
    "pins": [
      {
        "name": "VCC",
        "desc": "Power"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "D0",
        "desc": "Digital Output"
      },
      {
        "name": "A0",
        "desc": "Analog Output"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "D8",
          "A0"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "D0",
            "boardPin": "D8"
          },
          {
            "sensorPin": "A0",
            "boardPin": "A0"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G10",
          "G34"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "D0",
            "boardPin": "G10"
          },
          {
            "sensorPin": "A0",
            "boardPin": "G34"
          }
        ]
      }
    }
  },
  {
    "id": "mq2",
    "name": "MQ-2",
    "image": "/images/hardware/mq2.png",
    "shortDesc": "Gas Sensor",
    "longDesc": "Sensitive for LPG, i-butane, propane, methane, alcohol, Hydrogen, smoke.",
    "whatItDoes": "Detects the presence of combustible gases and smoke in the air.",
    "pins": [
      {
        "name": "VCC",
        "desc": "Power"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "D0",
        "desc": "Digital Output"
      },
      {
        "name": "A0",
        "desc": "Analog Output"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "D9",
          "A0"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "D0",
            "boardPin": "D9"
          },
          {
            "sensorPin": "A0",
            "boardPin": "A0"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G11",
          "G34"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "D0",
            "boardPin": "G11"
          },
          {
            "sensorPin": "A0",
            "boardPin": "G34"
          }
        ]
      }
    }
  },
  {
    "id": "mq135",
    "name": "MQ-135",
    "image": "/images/hardware/mq135.png",
    "shortDesc": "Air Quality Sensor",
    "longDesc": "Used in air quality control equipment for buildings/offices, sensitive to NH3, NOx, alcohol, Benzene, smoke, CO2, etc.",
    "whatItDoes": "Monitors indoor air quality by detecting harmful gases.",
    "pins": [
      {
        "name": "VCC",
        "desc": "Power"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "D0",
        "desc": "Digital Output"
      },
      {
        "name": "A0",
        "desc": "Analog Output"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "D10",
          "A0"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "D0",
            "boardPin": "D10"
          },
          {
            "sensorPin": "A0",
            "boardPin": "A0"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G12",
          "G34"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "D0",
            "boardPin": "G12"
          },
          {
            "sensorPin": "A0",
            "boardPin": "G34"
          }
        ]
      }
    }
  },
  {
    "id": "soil_moisture",
    "name": "Capacitive Soil Moisture",
    "image": "/images/hardware/soil_moisture.png",
    "shortDesc": "Soil Hydration Sensor",
    "longDesc": "Measures soil moisture levels by capacitive sensing rather than resistive sensing like other sensors on the market.",
    "whatItDoes": "Determines how wet or dry the soil is for automated plant watering systems.",
    "pins": [
      {
        "name": "VCC",
        "desc": "Power"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "AOUT",
        "desc": "Analog Output"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "A0"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "AOUT",
            "boardPin": "A0"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G34"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "AOUT",
            "boardPin": "G34"
          }
        ]
      }
    }
  },
  {
    "id": "rain",
    "name": "Rain Sensor Module",
    "image": "/images/hardware/rain.png",
    "shortDesc": "Water Drop Sensor",
    "longDesc": "An analog sensor that can detect water droplets or rain.",
    "whatItDoes": "Acts as a switch when raindrops fall through the raining board.",
    "pins": [
      {
        "name": "VCC",
        "desc": "Power"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "D0",
        "desc": "Digital Output"
      },
      {
        "name": "A0",
        "desc": "Analog Output"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "D11",
          "A0"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "D0",
            "boardPin": "D11"
          },
          {
            "sensorPin": "A0",
            "boardPin": "A0"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G13",
          "G34"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "D0",
            "boardPin": "G13"
          },
          {
            "sensorPin": "A0",
            "boardPin": "G34"
          }
        ]
      }
    }
  },
  {
    "id": "water_level",
    "name": "Water Level Sensor",
    "image": "/images/hardware/water_level.png",
    "shortDesc": "Liquid Level Sensor",
    "longDesc": "An easy-to-use, cost-effective high level/drop recognition sensor.",
    "whatItDoes": "Measures the depth of water based on the conductivity of the exposed traces.",
    "pins": [
      {
        "name": "S",
        "desc": "Analog Signal"
      },
      {
        "name": "+",
        "desc": "Power"
      },
      {
        "name": "-",
        "desc": "Ground"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "A0",
          "5V",
          "GND"
        ],
        "mappings": [
          {
            "sensorPin": "S",
            "boardPin": "A0"
          },
          {
            "sensorPin": "+",
            "boardPin": "5V"
          },
          {
            "sensorPin": "-",
            "boardPin": "GND"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "G34",
          "3V3",
          "GND"
        ],
        "mappings": [
          {
            "sensorPin": "S",
            "boardPin": "G34"
          },
          {
            "sensorPin": "+",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "-",
            "boardPin": "GND"
          }
        ]
      }
    }
  },
  {
    "id": "yfs201",
    "name": "YF-S201",
    "image": "/images/hardware/generic_sensor.png",
    "shortDesc": "Water Flow Sensor",
    "longDesc": "Consists of a plastic valve body, a water rotor, and a hall-effect sensor.",
    "whatItDoes": "Measures the rate of liquid flowing through it by counting hall effect pulses.",
    "pins": [
      {
        "name": "Red",
        "desc": "5V Power"
      },
      {
        "name": "Black",
        "desc": "Ground"
      },
      {
        "name": "Yellow",
        "desc": "PWM Output Signal"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "D12"
        ],
        "mappings": [
          {
            "sensorPin": "Red",
            "boardPin": "5V"
          },
          {
            "sensorPin": "Black",
            "boardPin": "GND"
          },
          {
            "sensorPin": "Yellow",
            "boardPin": "D12"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G14"
        ],
        "mappings": [
          {
            "sensorPin": "Red",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "Black",
            "boardPin": "GND"
          },
          {
            "sensorPin": "Yellow",
            "boardPin": "G14"
          }
        ]
      }
    }
  },
  {
    "id": "hx711",
    "name": "HX711 + Load Cell",
    "image": "/images/hardware/generic_sensor.png",
    "shortDesc": "Weight Scale Amplifier",
    "longDesc": "A precision 24-bit analog-to-digital converter (ADC) designed for weigh scales and industrial control applications.",
    "whatItDoes": "Translates the small resistance changes in a load cell into a digital weight measurement.",
    "pins": [
      {
        "name": "VCC",
        "desc": "Power"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "DT",
        "desc": "Data Output"
      },
      {
        "name": "SCK",
        "desc": "Clock Input"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "D13",
          "D2"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "DT",
            "boardPin": "D13"
          },
          {
            "sensorPin": "SCK",
            "boardPin": "D2"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G15",
          "G16"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "DT",
            "boardPin": "G15"
          },
          {
            "sensorPin": "SCK",
            "boardPin": "G16"
          }
        ]
      }
    }
  },
  {
    "id": "max30102",
    "name": "MAX30102",
    "image": "/images/hardware/generic_sensor.png",
    "shortDesc": "Pulse Oximeter",
    "longDesc": "An integrated pulse oximetry and heart-rate monitor biosensor module.",
    "whatItDoes": "Measures heart rate and blood oxygen levels by emitting and measuring light.",
    "pins": [
      {
        "name": "VIN",
        "desc": "Power"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "SCL",
        "desc": "I2C Clock"
      },
      {
        "name": "SDA",
        "desc": "I2C Data"
      },
      {
        "name": "INT",
        "desc": "Interrupt"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "A5",
          "A4",
          "D3"
        ],
        "mappings": [
          {
            "sensorPin": "VIN",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SCL",
            "boardPin": "A5"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "A4"
          },
          {
            "sensorPin": "INT",
            "boardPin": "D3"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G22",
          "G21",
          "G17"
        ],
        "mappings": [
          {
            "sensorPin": "VIN",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SCL",
            "boardPin": "G22"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "G21"
          },
          {
            "sensorPin": "INT",
            "boardPin": "G17"
          }
        ]
      }
    }
  },
  {
    "id": "mlx90614",
    "name": "MLX90614",
    "image": "/images/hardware/generic_sensor.png",
    "shortDesc": "IR Temp Sensor",
    "longDesc": "An infrared thermometer for non-contact temperature measurements.",
    "whatItDoes": "Measures the surface temperature of objects from a distance without touching them.",
    "pins": [
      {
        "name": "VIN",
        "desc": "Power"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "SCL",
        "desc": "I2C Clock"
      },
      {
        "name": "SDA",
        "desc": "I2C Data"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "A5",
          "A4"
        ],
        "mappings": [
          {
            "sensorPin": "VIN",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SCL",
            "boardPin": "A5"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "A4"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G22",
          "G21"
        ],
        "mappings": [
          {
            "sensorPin": "VIN",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SCL",
            "boardPin": "G22"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "G21"
          }
        ]
      }
    }
  },
  {
    "id": "acs712",
    "name": "ACS712",
    "image": "/images/hardware/generic_sensor.png",
    "shortDesc": "Current Sensor",
    "longDesc": "Provides economical and precise solutions for AC or DC current sensing in industrial, commercial, and communications systems.",
    "whatItDoes": "Measures electrical current flowing through a wire using the Hall effect.",
    "pins": [
      {
        "name": "VCC",
        "desc": "Power"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "OUT",
        "desc": "Analog Output"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "D4"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "OUT",
            "boardPin": "D4"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G18"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "OUT",
            "boardPin": "G18"
          }
        ]
      }
    }
  },
  {
    "id": "ina219",
    "name": "INA219",
    "image": "/images/hardware/generic_sensor.png",
    "shortDesc": "DC Current Sensor",
    "longDesc": "A shunt and power monitor with an I2C- or SMBUS-compatible interface.",
    "whatItDoes": "Accurately measures high-side voltage and DC current draw in a circuit.",
    "pins": [
      {
        "name": "VCC",
        "desc": "Power"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "SCL",
        "desc": "I2C Clock"
      },
      {
        "name": "SDA",
        "desc": "I2C Data"
      },
      {
        "name": "VIN+",
        "desc": "Load Power In"
      },
      {
        "name": "VIN-",
        "desc": "Load Power Out"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "A5",
          "A4"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SCL",
            "boardPin": "A5"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "A4"
          },
          {
            "sensorPin": "VIN+",
            "boardPin": "5V"
          },
          {
            "sensorPin": "VIN-",
            "boardPin": "5V"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G22",
          "G21"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SCL",
            "boardPin": "G22"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "G21"
          },
          {
            "sensorPin": "VIN+",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "VIN-",
            "boardPin": "3V3"
          }
        ]
      }
    }
  },
  {
    "id": "neo6m",
    "name": "NEO-6M GPS",
    "image": "/images/hardware/generic_sensor.png",
    "shortDesc": "GPS Module",
    "longDesc": "A stand-alone GPS receiver featuring the high performance u-blox 6 positioning engine.",
    "whatItDoes": "Receives signals from satellites to determine exact global geographic coordinates and time.",
    "pins": [
      {
        "name": "VCC",
        "desc": "Power"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "TX",
        "desc": "Serial Transmit"
      },
      {
        "name": "RX",
        "desc": "Serial Receive"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "D1",
          "D0"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "TX",
            "boardPin": "D1"
          },
          {
            "sensorPin": "RX",
            "boardPin": "D0"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G17",
          "G16"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "TX",
            "boardPin": "G17"
          },
          {
            "sensorPin": "RX",
            "boardPin": "G16"
          }
        ]
      }
    }
  },
  {
    "id": "pn532",
    "name": "PN532",
    "image": "/images/hardware/generic_sensor.png",
    "shortDesc": "NFC/RFID Reader",
    "longDesc": "The most popular NFC chip, used in almost every phone that does NFC.",
    "whatItDoes": "Reads and writes NFC tags, communicates with phones, or acts as an NFC tag itself.",
    "pins": [
      {
        "name": "5V",
        "desc": "Power"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "SDA/TX",
        "desc": "I2C Data / Serial TX"
      },
      {
        "name": "SCL/RX",
        "desc": "I2C Clock / Serial RX"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "A4",
          "A5"
        ],
        "mappings": [
          {
            "sensorPin": "5V",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SDA/TX",
            "boardPin": "A4"
          },
          {
            "sensorPin": "SCL/RX",
            "boardPin": "A5"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G21",
          "G22"
        ],
        "mappings": [
          {
            "sensorPin": "5V",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SDA/TX",
            "boardPin": "G21"
          },
          {
            "sensorPin": "SCL/RX",
            "boardPin": "G22"
          }
        ]
      }
    }
  },
  {
    "id": "apds9960",
    "name": "APDS9960",
    "image": "/images/hardware/generic_sensor.png",
    "shortDesc": "Gesture Sensor",
    "longDesc": "Features advanced gesture detection, proximity detection, digital Ambient Light Sense (ALS) and Color Sense (RGBC).",
    "whatItDoes": "Detects hand swipes (left, right, up, down) and measures light/color.",
    "pins": [
      {
        "name": "VL",
        "desc": "IR LED Power"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "VCC",
        "desc": "Power"
      },
      {
        "name": "SDA",
        "desc": "I2C Data"
      },
      {
        "name": "SCL",
        "desc": "I2C Clock"
      },
      {
        "name": "INT",
        "desc": "Interrupt"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "A4",
          "A5",
          "D5"
        ],
        "mappings": [
          {
            "sensorPin": "VL",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "VCC",
            "boardPin": "5V"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "A4"
          },
          {
            "sensorPin": "SCL",
            "boardPin": "A5"
          },
          {
            "sensorPin": "INT",
            "boardPin": "D5"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G21",
          "G22",
          "G19"
        ],
        "mappings": [
          {
            "sensorPin": "VL",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "VCC",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "G21"
          },
          {
            "sensorPin": "SCL",
            "boardPin": "G22"
          },
          {
            "sensorPin": "INT",
            "boardPin": "G19"
          }
        ]
      }
    }
  },
  {
    "id": "veml6075",
    "name": "VEML6075",
    "image": "/images/hardware/generic_sensor.png",
    "shortDesc": "UVA/UVB Sensor",
    "longDesc": "Incorporates a photodiode, amplifiers, and analog/digital circuits into a single chip using a CMOS process.",
    "whatItDoes": "Senses both UVA and UVB light bands to calculate the UV index.",
    "pins": [
      {
        "name": "VCC",
        "desc": "Power"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "SDA",
        "desc": "I2C Data"
      },
      {
        "name": "SCL",
        "desc": "I2C Clock"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "A4",
          "A5"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "A4"
          },
          {
            "sensorPin": "SCL",
            "boardPin": "A5"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G21",
          "G22"
        ],
        "mappings": [
          {
            "sensorPin": "VCC",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "SDA",
            "boardPin": "G21"
          },
          {
            "sensorPin": "SCL",
            "boardPin": "G22"
          }
        ]
      }
    }
  },
  {
    "id": "mhz19b",
    "name": "MH-Z19B",
    "image": "/images/hardware/generic_sensor.png",
    "shortDesc": "CO2 Sensor",
    "longDesc": "A common type, intelligent, small-scale sensor, using non-dispersive infrared (NDIR) principle to detect the existence of CO2.",
    "whatItDoes": "Measures Carbon Dioxide concentrations in the air with high accuracy.",
    "pins": [
      {
        "name": "Vin",
        "desc": "Power"
      },
      {
        "name": "GND",
        "desc": "Ground"
      },
      {
        "name": "Tx",
        "desc": "Serial Transmit"
      },
      {
        "name": "Rx",
        "desc": "Serial Receive"
      },
      {
        "name": "PWM",
        "desc": "PWM Output"
      }
    ],
    "wiring": {
      "arduino": {
        "boardName": "Arduino Uno R4",
        "boardImage": "/images/hardware/arduino_uno_1783075686637.png",
        "boardPins": [
          "5V",
          "GND",
          "D1",
          "D0",
          "D6"
        ],
        "mappings": [
          {
            "sensorPin": "Vin",
            "boardPin": "5V"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "Tx",
            "boardPin": "D1"
          },
          {
            "sensorPin": "Rx",
            "boardPin": "D0"
          },
          {
            "sensorPin": "PWM",
            "boardPin": "D6"
          }
        ]
      },
      "esp32": {
        "boardName": "ESP32 Dev Board",
        "boardImage": "/images/hardware/esp32_board_1783075698872.png",
        "boardPins": [
          "3V3",
          "GND",
          "G17",
          "G16",
          "G20"
        ],
        "mappings": [
          {
            "sensorPin": "Vin",
            "boardPin": "3V3"
          },
          {
            "sensorPin": "GND",
            "boardPin": "GND"
          },
          {
            "sensorPin": "Tx",
            "boardPin": "G17"
          },
          {
            "sensorPin": "Rx",
            "boardPin": "G16"
          },
          {
            "sensorPin": "PWM",
            "boardPin": "G20"
          }
        ]
      }
    }
  }
];
