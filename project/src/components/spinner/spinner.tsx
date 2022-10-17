import style from './spinner.module.css';

function Spinner(): JSX.Element {
  const bars: JSX.Element[] = [];

  for (let i = 0; i < 12; i++) {
    const barStyle = {
      WebkitAnimationDelay: '',
      animationDelay: '',
      WebkitTransform: '',
      transform: '',
    };
    barStyle.WebkitAnimationDelay = barStyle.animationDelay = `${(i - 12) / 10}s`;

    barStyle.WebkitTransform = barStyle.transform =
      `rotate(${i * 30}deg) translate(146%)`;

    bars.push(
      <div style={barStyle} className={style['react-spinner_bar']} key={i} />
    );
  }

  return (
    <div className={style.wrapper}>
      <div className={style['react-spinner']}>
        {bars}
      </div>
    </div>
  );
}

export default Spinner;
