const isLower = (ch: string) => /[a-z]/.test(ch);

const isUpper = (ch: string) => /[A-Z]/.test(ch);

const readableIdentifier = (name: string): string => {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  if (capitalizedName.length <= 1) {
    return capitalizedName;
  }

  let accumulatedChars = '';
  let currentIndex = 0;
  let nextIndex = 1;

  while (currentIndex < capitalizedName.length) {
    const currentChar = capitalizedName.charAt(currentIndex);
    const nextChar = capitalizedName.charAt(nextIndex);

    if (isUpper(currentChar) && isLower(nextChar)) {
      accumulatedChars += ' ' + currentChar + nextChar;
      currentIndex++;
      nextIndex++;
    }
    else if (isLower(currentChar) && isUpper(nextChar)) {
      accumulatedChars += currentChar + ' ' + nextChar;
      currentIndex++;
      nextIndex++;
    }
    else {
      accumulatedChars += currentChar;
    }

    currentIndex++;
    nextIndex++;
  }

  return accumulatedChars.trimStart();
};

const Table = (
  { rows, classes }:
  {
    rows: object[],
    classes?: {
      self?: string,
      labels?: string,
      cells?: string
    }
  }
) => {
  const tableClass = `table ${ classes?.self }`;
  
  if (rows.length === 0) {
    return <table className={ tableClass }/>
  }

  const colNames = Object.keys(rows[0]).map(readableIdentifier);

  return (
    <table className={ tableClass }>
      <thead>
        <tr>
          {
            colNames.map(cn => (
              <th key={ cn } className={ classes?.labels }>
                { cn }
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          rows.map((r, i) => (
            <tr key={ i }>
              {
                Object.entries(r).map(([ k, v ]) => (
                  <td key={ k } className={ classes?.cells }>
                    { v }
                  </td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

export default Table;
