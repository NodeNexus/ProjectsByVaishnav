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
    id: 'arduino_uno',
    name: "Arduino Uno R4",
    image: "/images/hardware/arduino_uno_1783075686637.png",
    shortDesc: "32-bit ARM Cortex-M4 Microcontroller",
    longDesc: "The Arduino UNO R4 Minima brings the 32-bit computing power of the Renesas RA4M1 microcontroller to the classic UNO form factor.",
    whatItDoes: "Acts as the brain for simple to moderately complex electronics projects, reading sensors and controlling outputs.",
    pins: [
      { name: "5V/3.3V", desc: "Power supply pins" },
      { name: "GND", desc: "Ground pins" },
      { name: "A0-A5", desc: "Analog input pins" },
      { name: "D0-D13", desc: "Digital I/O pins (D3, D5, D6, D9, D10, D11 support PWM)" }
    ]
  },
  {
    id: 'esp32',
    name: "ESP32 Dev Board",
    image: "/images/hardware/esp32_board_1783075698872.png",
    shortDesc: "Dual-core WiFi/BT MCU",
    longDesc: "A powerful, feature-rich MCU with integrated Wi-Fi and Bluetooth capabilities, perfect for IoT applications.",
    whatItDoes: "Connects your electronics projects to the internet while offering substantial processing power for complex algorithms.",
    pins: [
      { name: "VIN/3V3", desc: "Power supply pins" },
      { name: "GND", desc: "Ground pins" },
      { name: "GPIOs", desc: "General purpose I/O pins with advanced multiplexing" },
      { name: "ADC/DAC", desc: "Analog inputs and Digital-to-Analog outputs" }
    ]
  },
  {
    id: 'hcsr04',
    name: "HC-SR04",
    image: "/images/hardware/ultrasonic_sensor_1783075710376.png",
    shortDesc: "Ultrasonic Distance Sensor",
    longDesc: "Uses sonar to determine the distance to an object, offering excellent non-contact range detection with high accuracy and stable readings.",
    whatItDoes: "Measures distance by sending out an ultrasonic pulse and measuring the time it takes for the echo to return.",
    pins: [
      { name: "VCC", desc: "5V Power Supply" },
      { name: "TRIG", desc: "Trigger Input (Sends ultrasonic pulse)" },
      { name: "ECHO", desc: "Echo Output (Receives the reflection)" },
      { name: "GND", desc: "Ground" }
    ],
    wiring: {
      arduino: {
        boardName: "Arduino Uno R4",
        boardImage: "/images/hardware/arduino_uno_1783075686637.png",
        boardPins: ["5V", "GND", "D9", "D10"],
        mappings: [
          { sensorPin: "VCC", boardPin: "5V" },
          { sensorPin: "GND", boardPin: "GND" },
          { sensorPin: "TRIG", boardPin: "D9" },
          { sensorPin: "ECHO", boardPin: "D10" }
        ]
      },
      esp32: {
        boardName: "ESP32 Dev Board",
        boardImage: "/images/hardware/esp32_board_1783075698872.png",
        boardPins: ["VIN", "GND", "G5", "G18"],
        mappings: [
          { sensorPin: "VCC", boardPin: "VIN" },
          { sensorPin: "GND", boardPin: "GND" },
          { sensorPin: "TRIG", boardPin: "G5" },
          { sensorPin: "ECHO", boardPin: "G18" }
        ]
      }
    }
  },
  {
    id: 'dht11',
    name: "DHT11 / DHT22",
    image: "/images/hardware/dht11_sensor_1783075721243.png",
    shortDesc: "Temp & Humidity Sensor",
    longDesc: "A basic, ultra low-cost digital temperature and humidity sensor. It uses a capacitive humidity sensor and a thermistor to measure the surrounding air.",
    whatItDoes: "Spits out a digital signal on the data pin providing reliable ambient temperature and humidity readings.",
    pins: [
      { name: "VCC", desc: "3.3V - 5V Power Supply" },
      { name: "DATA", desc: "Digital signal output" },
      { name: "GND", desc: "Ground" }
    ],
    wiring: {
      arduino: {
        boardName: "Arduino Uno R4",
        boardImage: "/images/hardware/arduino_uno_1783075686637.png",
        boardPins: ["5V", "GND", "D2"],
        mappings: [
          { sensorPin: "VCC", boardPin: "5V" },
          { sensorPin: "GND", boardPin: "GND" },
          { sensorPin: "DATA", boardPin: "D2" }
        ]
      },
      esp32: {
        boardName: "ESP32 Dev Board",
        boardImage: "/images/hardware/esp32_board_1783075698872.png",
        boardPins: ["3V3", "GND", "G4"],
        mappings: [
          { sensorPin: "VCC", boardPin: "3V3" },
          { sensorPin: "GND", boardPin: "GND" },
          { sensorPin: "DATA", boardPin: "G4" }
        ]
      }
    }
  },
  {
    id: 'l298n',
    name: "L298N",
    image: "/images/hardware/motor_driver_1783075733447.png",
    shortDesc: "Dual Motor Driver",
    longDesc: "A dual H-Bridge motor driver which allows speed and direction control of two DC motors at the same time.",
    whatItDoes: "Provides the high current needed to drive motors, which microcontrollers cannot supply directly, while interpreting low-current control signals.",
    pins: [
      { name: "ENA", desc: "PWM input for Motor A speed" },
      { name: "IN1", desc: "Direction control 1 for Motor A" },
      { name: "IN2", desc: "Direction control 2 for Motor A" },
      { name: "IN3", desc: "Direction control 1 for Motor B" },
      { name: "IN4", desc: "Direction control 2 for Motor B" },
      { name: "ENB", desc: "PWM input for Motor B speed" }
    ],
    wiring: {
      arduino: {
        boardName: "Arduino Uno R4",
        boardImage: "/images/hardware/arduino_uno_1783075686637.png",
        boardPins: ["D10", "D9", "D8", "D7", "D6", "D5"],
        mappings: [
          { sensorPin: "ENA", boardPin: "D10" },
          { sensorPin: "IN1", boardPin: "D9" },
          { sensorPin: "IN2", boardPin: "D8" },
          { sensorPin: "IN3", boardPin: "D7" },
          { sensorPin: "IN4", boardPin: "D6" },
          { sensorPin: "ENB", boardPin: "D5" }
        ]
      },
      esp32: {
        boardName: "ESP32 Dev Board",
        boardImage: "/images/hardware/esp32_board_1783075698872.png",
        boardPins: ["G14", "G27", "G26", "G25", "G33", "G32"],
        mappings: [
          { sensorPin: "ENA", boardPin: "G14" },
          { sensorPin: "IN1", boardPin: "G27" },
          { sensorPin: "IN2", boardPin: "G26" },
          { sensorPin: "IN3", boardPin: "G25" },
          { sensorPin: "IN4", boardPin: "G33" },
          { sensorPin: "ENB", boardPin: "G32" }
        ]
      }
    }
  },
  {
    id: 'sg90',
    name: "SG90 Servo",
    image: "/images/hardware/servo_motor_1783075744728.png",
    shortDesc: "Micro Servo Motor",
    longDesc: "A lightweight, high-quality and lightning-fast servo motor. It can rotate approximately 180 degrees (90 in each direction).",
    whatItDoes: "Provides precise angular positioning for small robotic arms, steering mechanisms, or camera pans.",
    pins: [
      { name: "VCC", desc: "5V Power Supply (Red)" },
      { name: "GND", desc: "Ground (Brown)" },
      { name: "SIG", desc: "PWM Control Signal (Orange)" }
    ],
    wiring: {
      arduino: {
        boardName: "Arduino Uno R4",
        boardImage: "/images/hardware/arduino_uno_1783075686637.png",
        boardPins: ["5V", "GND", "D9"],
        mappings: [
          { sensorPin: "VCC", boardPin: "5V" },
          { sensorPin: "GND", boardPin: "GND" },
          { sensorPin: "SIG", boardPin: "D9" }
        ]
      },
      esp32: {
        boardName: "ESP32 Dev Board",
        boardImage: "/images/hardware/esp32_board_1783075698872.png",
        boardPins: ["VIN", "GND", "G18"],
        mappings: [
          { sensorPin: "VCC", boardPin: "VIN" },
          { sensorPin: "GND", boardPin: "GND" },
          { sensorPin: "SIG", boardPin: "G18" }
        ]
      }
    }
  },
  {
    id: 'mfrc522',
    name: "MFRC522",
    image: "/images/hardware/rfid_module_1783075755922.png",
    shortDesc: "RFID Reader/Writer",
    longDesc: "A highly integrated reader/writer IC for contactless communication at 13.56 MHz, utilizing SPI communication.",
    whatItDoes: "Reads data from and writes data to compatible RFID tags or cards for access control and identification.",
    pins: [
      { name: "3.3V", desc: "Power Supply" },
      { name: "RST", desc: "Reset and power-down input" },
      { name: "GND", desc: "Ground" },
      { name: "MISO", desc: "Master In Slave Out (SPI)" },
      { name: "MOSI", desc: "Master Out Slave In (SPI)" },
      { name: "SCK", desc: "Serial Clock (SPI)" },
      { name: "SDA", desc: "Chip Select / SS (SPI)" }
    ],
    wiring: {
      arduino: {
        boardName: "Arduino Uno R4",
        boardImage: "/images/hardware/arduino_uno_1783075686637.png",
        boardPins: ["3.3V", "D9", "GND", "D12", "D11", "D13", "D10"],
        mappings: [
          { sensorPin: "3.3V", boardPin: "3.3V" },
          { sensorPin: "RST", boardPin: "D9" },
          { sensorPin: "GND", boardPin: "GND" },
          { sensorPin: "MISO", boardPin: "D12" },
          { sensorPin: "MOSI", boardPin: "D11" },
          { sensorPin: "SCK", boardPin: "D13" },
          { sensorPin: "SDA", boardPin: "D10" }
        ]
      },
      esp32: {
        boardName: "ESP32 Dev Board",
        boardImage: "/images/hardware/esp32_board_1783075698872.png",
        boardPins: ["3V3", "G22", "GND", "G19", "G23", "G18", "G21"],
        mappings: [
          { sensorPin: "3.3V", boardPin: "3V3" },
          { sensorPin: "RST", boardPin: "G22" },
          { sensorPin: "GND", boardPin: "GND" },
          { sensorPin: "MISO", boardPin: "G19" },
          { sensorPin: "MOSI", boardPin: "G23" },
          { sensorPin: "SCK", boardPin: "G18" },
          { sensorPin: "SDA", boardPin: "G21" }
        ]
      }
    }
  },
  {
    id: 'relay5v',
    name: "5V Relay",
    image: "/images/hardware/relay_module_1783075767148.png",
    shortDesc: "Switching Module",
    longDesc: "An electrically operated switch that allows you to turn on or off a circuit using voltage and/or current much higher than a microcontroller can handle.",
    whatItDoes: "Acts as a bridge between low-power electronics and high-power appliances (like lamps, motors, heaters).",
    pins: [
      { name: "VCC", desc: "Power Supply for electromagnet" },
      { name: "GND", desc: "Ground" },
      { name: "IN", desc: "Trigger signal (High or Low depending on module)" }
    ],
    wiring: {
      arduino: {
        boardName: "Arduino Uno R4",
        boardImage: "/images/hardware/arduino_uno_1783075686637.png",
        boardPins: ["5V", "GND", "D8"],
        mappings: [
          { sensorPin: "VCC", boardPin: "5V" },
          { sensorPin: "GND", boardPin: "GND" },
          { sensorPin: "IN", boardPin: "D8" }
        ]
      },
      esp32: {
        boardName: "ESP32 Dev Board",
        boardImage: "/images/hardware/esp32_board_1783075698872.png",
        boardPins: ["VIN", "GND", "G23"],
        mappings: [
          { sensorPin: "VCC", boardPin: "VIN" },
          { sensorPin: "GND", boardPin: "GND" },
          { sensorPin: "IN", boardPin: "G23" }
        ]
      }
    }
  }
];
