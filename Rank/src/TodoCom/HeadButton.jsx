export function HeadButton(props) {
  const { ListActivation, activateListItems, ListDisplay, setItemsCount } =
    props;
  return (
    <span>
      <input
        className="toggle-all"
        id="toggle-all"
        type="checkbox"
        onClick={() => {
          const Tmp = ListActivation;
          let Cnt = 0;
          for (let Index = 0; Index < ListActivation.length; Index++) {
            Cnt += Tmp[Index] + ListDisplay[Index] <= 1 ? 0 : 1;
          }
          if (Cnt > 0) {
            for (let Index = 0; Index < ListActivation.length; Index++) {
              Tmp[Index] = 0;
              const TmpThis = document.getElementById(`button${Index}`);
              if (TmpThis != null) {
                TmpThis.checked = true;
              }
            }
            setItemsCount(0);
          } else {
            for (let Index = 0; Index < ListActivation.length; Index++) {
              Tmp[Index] = 1;
              const TmpThis = document.getElementById(`button${Index}`);
              if (TmpThis != null) {
                TmpThis.checked = false;
              }
              Cnt += Tmp[Index] + ListDisplay[Index] <= 1 ? 0 : 1;
            }
            setItemsCount(Cnt);
          }
          activateListItems(Tmp);
          fetch('http://localhost:8000/data', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          })
            .then(res => {
              return res.json();
            })
            .then(result => {
              // https://localhost/vote/api
              fetch('http://127.0.0.1:8000/data', {
                method: 'POST',
                body: JSON.stringify({
                  ListItems: result.ListItems,
                  ListActivation: Tmp,
                  ListDisplay: result.ListDisplay,
                  ItemsCount: Cnt,
                  CandidateList: result.CandidateList,
                }),
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
              });
            });
        }}
      />
      <label htmlFor="toggle-all">::before</label>
    </span>
  );
}
