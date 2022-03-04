import platform, sys
import subprocess

args = sys.argv[1:]


if len(args) == 0:
    # print usage
    sys.exit(1)
else:
    command = args[0]
    # this only works on Linux and Windows
    if platform.system() == "Windows":
        import screen_brightness_control as sbc

        if command == "get":
            print(sbc.get_brightness(display=0))
        elif command == "set":
            if len(args) == 2:
                sbc.set_brightness(int(args[1]))
            else:
                print("Invalid command arguments len")
        else:
            print("Invalid command")
    elif platform.system() == "Linux":
        try:
            if command == "get":
                subprocess.call(['brightnessctl', 'g'])
            elif command == "set":
                if len(args) == 2:
                    subprocess.call(['brightnessctl', 's', f"{args[1]}%"])
                else:
                    print("Invalid command arguments len")
            else:
                print("Invalid command")
        except FileNotFoundError:
            print("Invalid command (brightness not found)")
    # handle file not found error.
    else:
        print("Unsupported OS")
        sys.exit(1)
