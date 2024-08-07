export function HeadInput(props) {
  const { setNewText } = props;
  return (
    <input
      type="text"
      id="BoxText"
      className="new-todo"
      placeholder="Input the Vote (Format: 1,3,4)"
      onBlur={() => {
        setNewText(document.getElementById('BoxText').value);
        const TmpButton = document.getElementById('toggle-all');
        TmpButton.checked = false;
      }}
      onKeyDown={e => {
        if (e.keyCode === 13) {
          setNewText(document.getElementById('BoxText').value);
          const TmpButton = document.getElementById('toggle-all');
          TmpButton.checked = false;
        }
      }}
    ></input>
  );
}
