import { HStack, IconButton } from "@chakra-ui/react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { GiNightSleep } from "react-icons/gi";
import { RiRestartLine } from "react-icons/ri";
import { VscLock } from "react-icons/vsc";
import { setRebootDevice, setShutdownDevice, setSuspendDevice } from "../providers/cmd";

const Power = () => {
    return (
        <HStack spacing={10}>
            <IconButton
                icon={<AiOutlinePoweroff />}
                variant="outline"
                color="danger"
                colorScheme="danger"
                size="lg"
                onClick={async () => await setShutdownDevice()} />
            <IconButton
                icon={<GiNightSleep />}
                variant="outline"
                color="warning"
                colorScheme="warning"
                size="lg"
                onClick={async () => await setSuspendDevice() } />
            <IconButton
                icon={<RiRestartLine />}
                variant="outline"
                color="highlight"
                colorScheme="highlight"
                size="lg"
                onClick={async () => await setRebootDevice() } />
            <IconButton
                icon={<VscLock />}
                variant="outline"
                color="text"
                colorScheme="text"
                size="lg"
                onClick={async () => await setRebootDevice() } />
        </HStack>
    );
};

export default Power
