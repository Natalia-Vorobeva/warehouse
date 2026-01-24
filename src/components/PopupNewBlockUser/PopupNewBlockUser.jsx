import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsOpenPopupNewBlock } from '../../store/userDefinedFunctions/userDefinedFunctionsSlice';
import Popup from '../Popup/Popup';
import Button from '../Button/Button';
import './PopupNewBlockUser.scss';

function PopupNewBlockUser({
  title = "Новый блок",
  btnText = "Сохранить",
  handleSubmit,
  isOpenPopup,
  onClose,
}) {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    tooltip: '',
    width: '',
    height: '',
    depth: '',
    isPallet: false
  });

  const [errors, setErrors] = useState({
    tooltip: '',
    width: '',
    depth: ''
  });

  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState({
    tooltip: false,
    width: false,
    depth: false
  });

  // Валидация полей
  const validateField = (name, value) => {
    switch (name) {
      case 'tooltip':
        if (!value.trim()) {
          return 'Название обязательно для заполнения';
        }
        if (value.trim().length < 2) {
          return 'Название должно содержать минимум 2 символа';
        }
        if (value.trim().length > 50) {
          return 'Название не должно превышать 50 символов';
        }
        return '';

      case 'width':
      case 'depth':
        if (!value) {
          return 'Поле обязательно для заполнения';
        }
        if (isNaN(value) || parseFloat(value) <= 0) {
          return 'Введите положительное число';
        }
        if (parseFloat(value) > 10000) {
          return 'Значение не должно превышать 10000 см';
        }
        return '';

      case 'height':
        if (value && (isNaN(value) || parseFloat(value) < 0)) {
          return 'Введите положительное число';
        }
        return '';

      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'tooltip') {
      setValues(prev => ({ ...prev, [name]: value }));
    } else {
      // Разрешаем только цифры и точку для десятичных чисел
      const numericValue = value.replace(/[^0-9.]/g, '');
      // Убираем лишние точки
      const parts = numericValue.split('.');
      const finalValue = parts.length > 2 
        ? parts[0] + '.' + parts.slice(1).join('') 
        : numericValue;
      
      setValues(prev => ({ ...prev, [name]: finalValue }));
    }

    // Валидация при изменении
    if (touched[name]) {
      const error = validateField(name, name === 'tooltip' ? value : value.replace(/[^0-9.]/g, ''));
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, name === 'tooltip' ? value : value.replace(/[^0-9.]/g, ''));
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleTogglePallet = () => {
		console.log('Текущее значение isPallet:', values.isPallet);
  console.log('Новое значение будет:', !values.isPallet);
    setValues(prev => ({ ...prev, isPallet: !prev.isPallet }));
  };
	

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      dispatch(setIsOpenPopupNewBlock(false));
    }
    setValues({
      tooltip: '',
      width: '',
      height: '',
      depth: '',
      isPallet: false
    });
    setErrors({
      tooltip: '',
      width: '',
      depth: ''
    });
    setTouched({
      tooltip: false,
      width: false,
      depth: false
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    // Проверяем все поля перед отправкой
    const newTouched = {
      tooltip: true,
      width: true,
      depth: true
    };
    setTouched(newTouched);

    const newErrors = {
      tooltip: validateField('tooltip', values.tooltip),
      width: validateField('width', values.width),
      depth: validateField('depth', values.depth)
    };
    setErrors(newErrors);

    // Если есть ошибки - не отправляем
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) {
      return;
    }

    if (isValid) {
      // Преобразуем данные перед отправкой
      const dataToSubmit = {
        ...values,
        // Добавляем тип на основе чекбокса
        type: values.isPallet ? 'pallet' : 'no-pallet'
      };
      
      console.log('Отправляем данные из попапа:', dataToSubmit);
      
      handleSubmit(dataToSubmit);
      handleClose();
    }
  };

  // Валидация всей формы
  useEffect(() => {
    const hasRequiredFields = values.tooltip.trim() !== '' && 
                             values.width !== '' && 
                             values.depth !== '';
    
    const noErrors = Object.values(errors).every(error => error === '');
    
    setIsValid(hasRequiredFields && noErrors);
  }, [values, errors]);

  return (
    <Popup
      name="new-block-user"
      isOpen={isOpenPopup}
      onClose={handleClose}
      onSubmit={onSubmit}
      title={title}
      size="medium"
      customClassName="popup-new-block-user"
    >
      <div className="popup-new-block-user__content">
        <div className="popup-new-block-user__field">
          <label htmlFor="tooltip-block" className="popup-new-block-user__label">
            Название блока *
          </label>
          <input
            type="text"
            id="tooltip-block"
            name="tooltip"
            value={values.tooltip}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Введите название (мин. 2 символа)"
            className={`popup-new-block-user__input-text ${
              errors.tooltip && touched.tooltip ? 'popup-new-block-user__input-error' : ''
            }`}
            required
          />
          {errors.tooltip && touched.tooltip && (
            <span className="popup-new-block-user__error">{errors.tooltip}</span>
          )}
        </div>

        <div className="popup-new-block-user__dimensions">
          <div className="popup-new-block-user__dimension-group">
            <div className="popup-new-block-user__field">
              <label htmlFor="width-block" className="popup-new-block-user__label">
                Ширина (см) *
              </label>
              <input
                type="text"
                id="width-block"
                name="width"
                value={values.width}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="0"
                className={`popup-new-block-user__input-number ${
                  errors.width && touched.width ? 'popup-new-block-user__input-error' : ''
                }`}
                required
              />
              {errors.width && touched.width && (
                <span className="popup-new-block-user__error">{errors.width}</span>
              )}
            </div>

            <div className="popup-new-block-user__field">
              <label htmlFor="depth-block" className="popup-new-block-user__label">
                Длина (см) *
              </label>
              <input
                type="text"
                id="depth-block"
                name="depth"
                value={values.depth}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="0"
                className={`popup-new-block-user__input-number ${
                  errors.depth && touched.depth ? 'popup-new-block-user__input-error' : ''
                }`}
                required
              />
              {errors.depth && touched.depth && (
                <span className="popup-new-block-user__error">{errors.depth}</span>
              )}
            </div>

            <div className="popup-new-block-user__field">
              <label htmlFor="height-block" className="popup-new-block-user__label">
                Высота (см)
              </label>
              <input
                type="text"
                id="height-block"
                name="height"
                value={values.height}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="0"
                className="popup-new-block-user__input-number"
              />
              {errors.height && (
                <span className="popup-new-block-user__error">{errors.height}</span>
              )}
            </div>
          </div>
          <div className="popup-new-block-user__dimensions-hint">
            * Обязательные поля
          </div>
        </div>

        <div className="popup-new-block-user__option">
          <label className="popup-new-block-user__checkbox-label">
            <input
              type="checkbox"
              checked={values.isPallet}
              onChange={handleTogglePallet}
              className="popup-new-block-user__checkbox"
            />
            <span className="popup-new-block-user__checkbox-text">Паллет</span>
          </label>
        </div>

        <div className="popup-new-block-user__actions">
          <Button
            type="submit"
            className={`popup-new-block-user__button ${!isValid ? 'popup-new-block-user__button_disabled' : ''}`}
            btnText={btnText}
            name="save-block"
            disabled={!isValid}
          />
        </div>
      </div>
    </Popup>
  );
}

export default PopupNewBlockUser;