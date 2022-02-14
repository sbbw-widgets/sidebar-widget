import platform, sys

args = sys.argv[1:]


if len(args) == 0:
    # print usage
    sys.exit(1)
else:
    command = args[0]

    # this only works on Linux and Windows
    if platform.system() == "Linux" or platform.system() == "Windows":
        import screen_brightness_control as sbc

        if command == "get":
            print(sbc.get_brightness(display=0))
        elif command == "set":
            if len(args) == 2:
                sbc.set_brightness(int(args[1]))
            else:
                print("Invalid command")
        else:
            print("Invalid command")
    else:
        print("Unsupported OS")
        sys.exit(1)
