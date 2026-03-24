function parseContent(text) {
    if (!text) return null;

    const parts = [];
    const lines = text.split('\n');
    let inList = false;
    let listItems = [];

    const processLine = (line) => {
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        line = line.replace(/<br\s*\/?>/gi, '\n');
        return line;
    };

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        
        if (!line) {
            if (inList) {
                parts.push(<ul key={`ul-${i}`}>{listItems}</ul>);
                listItems = [];
                inList = false;
            }
            continue;
        }

        line = processLine(line);

        if (line.startsWith('- ') || line.startsWith('* ')) {
            inList = true;
            listItems.push(<li key={`li-${i}`}>{line.slice(2)}</li>);
        } else {
            if (inList) {
                parts.push(<ul key={`ul-${i}`}>{listItems}</ul>);
                listItems = [];
                inList = false;
            }
            parts.push(<p key={`p-${i}`} dangerouslySetInnerHTML={{ __html: line }} />);
        }
    }

    if (inList) {
        parts.push(<ul key="ul-final">{listItems}</ul>);
    }

    return parts.length > 0 ? parts : null;
}

export { parseContent };
