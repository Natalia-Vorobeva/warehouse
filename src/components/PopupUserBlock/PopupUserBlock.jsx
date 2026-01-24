import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userDefinedFunctionsSelectors } from '../../store/userDefinedFunctions/userDefinedFunctionsSelectors.js';
import Popup from '../Popup/Popup';
import Button from '../Button/Button';
import './PopupUserBlock.scss';

function PopupUserBlock({
	isOpen,
	onClose,
	onAddComment,
}) {
	const dataInfoPopupBlock = useSelector(userDefinedFunctionsSelectors.getDataInfoPopupBlock);
	const [comment, setComment] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

	// Инициализация комментария при открытии попапа
	useEffect(() => {
		if (dataInfoPopupBlock) {
			setComment(dataInfoPopupBlock.more || '');
			setIsEditing(false);
			setHasUnsavedChanges(false);
		}
	}, [dataInfoPopupBlock]);

	const handleChange = (e) => {
		setComment(e.target.value);
		setHasUnsavedChanges(true);
	};

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleCancelEdit = () => {
		setComment(dataInfoPopupBlock.more || '');
		setIsEditing(false);
		setHasUnsavedChanges(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (comment.trim() !== (dataInfoPopupBlock?.more || '')) {
			onAddComment(comment.trim());
		}

		onClose();
	};

	const handleSaveComment = () => {
		if (comment.trim() !== (dataInfoPopupBlock?.more || '')) {
			onAddComment(comment.trim());
			setHasUnsavedChanges(false);
		}
		setIsEditing(false);
	};

	// Если данных нет, не показываем попап
	if (!dataInfoPopupBlock) {
		return null;
	}

	const isCommentEmpty = !dataInfoPopupBlock.more || dataInfoPopupBlock.more.trim() === '';

	return (
		<Popup
			name="user-block-info"
			isOpen={isOpen}
			onClose={() => {
				if (hasUnsavedChanges) {
					if (window.confirm('У вас есть несохраненные изменения. Закрыть без сохранения?')) {
						onClose();
					}
				} else {
					onClose();
				}
			}}
			onSubmit={handleSubmit}
			title={dataInfoPopupBlock.tooltip || 'Информация о блоке'}
			size="medium"
			customClassName="popup-user-block"
		>
			<div className="popup-user-block__content">
				<div className="popup-user-block__data">
					<div className="popup-user-block__data-item">
						<span className="popup-user-block__data-label">Тип:</span>
						<span className={`popup-user-block__data-value ${dataInfoPopupBlock.type === 'pallet'
							? 'popup-user-block__data-value_pallet'
							: 'popup-user-block__data-value_no-pallet'
							}`}>
							{dataInfoPopupBlock.type === 'pallet' ? 'Паллет' : 'Не паллет'}
						</span>
					</div>
					<div className="popup-user-block__data-item">
						<span className="popup-user-block__data-label">Ширина:</span>
						<span className="popup-user-block__data-value">{dataInfoPopupBlock.w || '—'} см</span>
					</div>
					<div className="popup-user-block__data-item">
						<span className="popup-user-block__data-label">Длина:</span>
						<span className="popup-user-block__data-value">{dataInfoPopupBlock.depth || '—'} см</span>
					</div>
					{dataInfoPopupBlock.h && dataInfoPopupBlock.h !== 1 && (
						<div className="popup-user-block__data-item">
							<span className="popup-user-block__data-label">Высота:</span>
							<span className="popup-user-block__data-value">{dataInfoPopupBlock.h}</span>
						</div>
					)}
					<div className="popup-user-block__data-item">
						<span className="popup-user-block__data-label">Стандарт:</span>
						<span className="popup-user-block__data-value">
							{dataInfoPopupBlock.standard ? 'Да' : 'Нет'}
						</span>
					</div>
				</div>

				<div className="popup-user-block__comment">
					<div className="popup-user-block__comment-header">
						<span className="popup-user-block__comment-title">Комментарий:</span>
						{!isCommentEmpty && !isEditing && (
							<button
								type="button"
								className="popup-user-block__comment-edit"
								onClick={handleEditClick}
								aria-label="Редактировать комментарий"
							>
								✏️
							</button>
						)}
					</div>

					{isCommentEmpty && !isEditing ? (
						<div className="popup-user-block__comment-empty">
							<p>Нет комментария</p>
							<button
								type="button"
								className="popup-user-block__comment-add-btn"
								onClick={handleEditClick}
							>
								Добавить комментарий
							</button>
						</div>
					) : isEditing ? (
						<div className="popup-user-block__comment-editing">
							<textarea
								value={comment}
								onChange={handleChange}
								placeholder="Введите ваш комментарий..."
								className="popup-user-block__comment-textarea"
								rows="3"
								autoFocus
							/>
							<div className="popup-user-block__comment-actions">
								<button
									type="button"
									className="popup-user-block__comment-save"
									onClick={handleSaveComment}
									disabled={!comment.trim()}
								>
									Сохранить
								</button>
								<button
									type="button"
									className="popup-user-block__comment-cancel"
									onClick={handleCancelEdit}
								>
									Отмена
								</button>
							</div>
						</div>
					) : (
						<div className="popup-user-block__comment-existing">
							<div className="popup-user-block__comment-text">
								{dataInfoPopupBlock.more}
							</div>
						</div>
					)}
				</div>

				{!isEditing && (
					<div className="popup-user-block__actions">
						<Button
							type="button"
							className="popup-user-block__button"
							btnText="Закрыть"
							name="close-info"
							onClick={onClose}
						/>
					</div>
				)}
			</div>
		</Popup>
	);
}

export default PopupUserBlock;