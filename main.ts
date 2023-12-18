input.onButtonPressed(Button.A, function () {
    l9110.controlMotor(l9110.Motor.MotorB, l9110.Rotate.Forward, 60)
})
input.onButtonPressed(Button.B, function () {
    l9110.pauseMotor(l9110.Motor.MotorB)
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    l9110.pauseMotor(l9110.Motor.MotorA)
    music.stopAllSounds()
    pins.digitalWritePin(DigitalPin.P1, 0)
    lcd.clearScreen()
})
lcd.displayText("Smart Home", 1, 1)
lcd.displayText("Team Everest", 1, 2)
lcd.displayText(convertToText(ds18b20.readTemperature(ds18b20.PinKit.P0, ds18b20.TemperatureType.Celsius)), 13, 1)
basic.forever(function () {
    if (ds18b20.readTemperature(ds18b20.PinKit.P0, ds18b20.TemperatureType.Celsius) > 40) {
        lcd.clearScreen()
        lcd.displayText("FIRE!!!", 1, 1)
        lcd.displayText("Please evacuate", 1, 2)
        music.play(music.stringPlayable("C5 B C5 B C5 B C5 B ", 120), music.PlaybackMode.LoopingInBackground)
        l9110.controlMotor(l9110.Motor.MotorA, l9110.Rotate.Forward, 65)
        basic.showLeds(`
            . . # . .
            . # # # .
            # # . # #
            # . . . #
            # # # # #
            `)
        basic.pause(100)
        while (ds18b20.readTemperature(ds18b20.PinKit.P0, ds18b20.TemperatureType.Celsius) > 40) {
            pins.digitalWritePin(DigitalPin.P1, 1)
            basic.pause(200)
            pins.digitalWritePin(DigitalPin.P1, 0)
        }
    }
    basic.pause(200)
    if (ds18b20.readTemperature(ds18b20.PinKit.P0, ds18b20.TemperatureType.Celsius) <= 40) {
        lcd.clearScreen()
        basic.pause(100)
        lcd.displayText("Smart Home", 1, 1)
        lcd.displayText("Team Everest", 1, 2)
        lcd.displayText(convertToText(ds18b20.readTemperature(ds18b20.PinKit.P0, ds18b20.TemperatureType.Celsius)), 13, 1)
        basic.pause(500)
        l9110.pauseMotor(l9110.Motor.MotorA)
        basic.showIcon(IconNames.Happy)
        pins.digitalWritePin(DigitalPin.P1, 0)
        music.stopAllSounds()
        basic.pause(200)
    }
})
