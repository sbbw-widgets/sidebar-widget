import platform, subprocess, sys

args = sys.argv[1:]


if len(args) == 0:
    # print usage
    sys.exit(1)
else:
    command = args[0]
    if platform.system() == "Linux":
        if command == "play":
            subprocess.call(["playerctl", "play"])
        elif command == "pause":
            subprocess.call(["playerctl", "pause"])
        elif command == "next":
            subprocess.call(["playerctl", "next"])
        elif command == "prev":
            subprocess.call(["playerctl", "previous"])
        elif command == "stop":
            subprocess.call(["playerctl", "stop"])
        elif command == "status":
            subprocess.call(["playerctl", "status"])
        elif command == "toggle":
            subprocess.call(["playerctl", "play-pause"])
        elif command == "metadata":
            subprocess.call(["playerctl", "metadata"])
        elif command == "set":
            if len(args) >= 2:
                subprocess.call(["playerctl", "metadata", "set", args[1]])
            else:
                sys.exit(1)
        else:
            print("Invalid command")
            sys.exit(1)
    elif platform.system() == "Darwin":
        print("Unsupported OS")
    elif platform.system() == "Windows":
        print("Unsupported OS")
    else:
        print("Unsupported OS")
        sys.exit(1)
