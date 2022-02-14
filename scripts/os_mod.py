import sys, psutil


args = sys.argv[1:]

if len(args) == 0:
    # print usage
    sys.exit(1)
else:
    command = args[0]
    args = args[1:]

    if command == "bat":
        bat = psutil.sensors_battery()
        if len(args) > 0:
            if args[0] == "get":
                if bat is None:
                    print("Battery not found")
                    sys.exit(0)
                else:
                    print(str(bat.percent).split(".")[0])
                    sys.exit(0)
        if bat is None:
            print("Battery not found")
        else:
            print(bat.power_plugged)
    # For the moment not found
    elif command == "net":
        net = psutil.net_if_stats()
        if args[0] == "get":
            if net is None:
                print("Network not found")
            else:
                print("Network not found")
                # print(net)
        else:
            print("Network not found")
    else:
        print("Unknown command")
        sys.exit(1)
