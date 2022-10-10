import React, { useCallback, useState } from 'react';
import { Button, Input, Group } from '@mantine/core';
import { IconBrandTwitter, IconX } from '@tabler/icons';
import { useEventListener } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';

type Props = {
    queryStrings: Array<string>,
    setQueryStrings: React.Dispatch<React.SetStateAction<Array<string>>>,
}

const TweetSearch:React.FC<Props> = ({queryStrings, setQueryStrings}) => {
    const [inputString, setInputString] = useState<string>("")    

    const submit = () => {
        if (inputString.length === 0) {
            console.log(queryStrings)
            showNotification({
                title: 'Empty Query',
                message: 'Please type in something...',
              })
            return
        }
        if (queryStrings.length >= 5) {
            console.log(queryStrings)
            showNotification({
                title: 'Search Limit',
                message: 'Query limit 5. Delete some queries if you want to search other terms.',
              })
            return
        }
        setQueryStrings(queryStrings.concat(inputString));
        setInputString("")
    }

    const keyboardSubmit = useCallback((e: any) => {
        if (e.keyCode == 13 && !e.shiftKey) {
          submit();
        }
      },[inputString]);
    const textAreaEnter = useEventListener("keydown", keyboardSubmit);

    return (
        <>
            <Group style={{width: "100%", display: 'flex'}}>
            <Input
                icon={<IconBrandTwitter size={16} />}
                placeholder="Search"
                style={{marginBottom: "5px", marginTop: "5px", flex: 19, whiteSpace: "normal", overflowWrap: "break-word"}}
                ref={textAreaEnter}
                value={inputString}
                rightSectionWidth={100 * queryStrings.length}
                onChange={(e: any) => {
                    setInputString(e.target.value)
                    }}
                rightSectionProps={{float: "left"}}
                rightSection={queryStrings.map((value, index) => {
                        return (
                            <Button 
                                rightIcon={<IconX size={8} />} 
                                variant="outline" 
                                radius="xs" 
                                size="xs" 
                                compact
                                style={{float: "left", whiteSpace: "normal", overflowWrap: "break-word"}}
                                onClick={() => {
                                    if (index === 0 && queryStrings.length === 1) {
                                        setQueryStrings([])
                                    }
                                    if (index > -1) {
                                        setQueryStrings(queryStrings.filter((v) => v != value))
                                    }
                                }}
                            >{value.substring(0,5) + "..."}</Button>
                        )
                    })
                }
                />
            <Button style={{flex: 1}} variant='outline'
                onClick={submit}
                >Search</Button>
            </Group>
        </>
    )
}

export default TweetSearch