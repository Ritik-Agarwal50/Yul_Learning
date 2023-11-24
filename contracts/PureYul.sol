object "PureYul" {
    code {
        //constructor
        datacopy(0,dataoffset("runtime"),datasize("runtime"))
        return (0,datasize("runtime"))

    }
    object "runtime" {
        code {
            //actual run time code
            switch getSelector()
            case 0x7eed0172 /* myFunc() sselector*/{
                mstore(0,4)
                return(0,0x20)//0x20 is the size of the return value which is 32 bytes
            }
            default{
                //do this
                revert(0,0)
            }
            /*---------------------*/
            /* Helpers Function */
            /*---------------------*/
            function getSelector() -> selector{
                selector := div(calldataload(0),0x100000000000000000000000000000000000000000000000000000000) 
            }       
        }
    }
}