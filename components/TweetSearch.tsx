import React, { useCallback, useState } from 'react';
import { Button, Input, Group } from '@mantine/core';
import { IconBrandTwitter } from '@tabler/icons';
import { useEventListener } from '@mantine/hooks';

type Props = {
    setQueryString: React.Dispatch<React.SetStateAction<string>>,
}

const TweetSearch:React.FC<Props> = ({setQueryString}) => {
    const [inputString, setInputString] = useState<string>("")    
    
    const submit = useCallback((e: any) => {
        if (e.keyCode == 13 && !e.shiftKey) {
          setQueryString(inputString);
          setInputString("")
        }
      },[inputString]);
    const textAreaEnter = useEventListener("keydown", submit);

    return (
        <>
            <Group style={{width: "100%", display: 'flex'}}>
            <Input
            icon={<IconBrandTwitter size={16} />}
            placeholder="Search"
            style={{marginBottom: "5px", marginTop: "5px", flex: 19}}
            ref={textAreaEnter}
            onChange={(e: any) => {
                setInputString(e.target.value)
                }}
                />
            <Button style={{flex: 1}} variant='outline'
                onClick={() => {
                    setQueryString(inputString)
                }}
                >Search</Button>
            </Group>
        </>
    )
}

export default TweetSearch